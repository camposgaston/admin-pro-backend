const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { jtwGenerator } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //email validation
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Datos incorrectos, email'
            });
        }

        //password validation
        const validPassword = bcryptjs.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos incorrectos, pass'
            });
        }

        //generate token
        const token = await jtwGenerator(userDB.id);

        res.status(200).json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500, contacte al administrador'
        });
    }
};

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { family_name, given_name, email, picture } = await googleVerify(googleToken);

        //Verify if user exist
        const userDB = await User.findOne({ email });

        if (!userDB) {
            // create new user if not exist
            user = new User({
                name: given_name,
                lastName: family_name,
                password: 'c928b324ab9cb78144abc8f02c4d3910', //Just for having one (password is required)
                email,
                google: true,
                img: picture,
            });
        } else {
            // update user "google" property to true if exist
            user = userDB;
            user.google = true;
        };

        // Save in Database

        await user.save();

        //generate token
        const token = await jtwGenerator(user.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto',
            googleToken
        });

    }

};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //generate token
    const token = await jtwGenerator(uid);

    //Get User data
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user

    });
};


module.exports = {
    login,
    googleSignIn,
    renewToken
}