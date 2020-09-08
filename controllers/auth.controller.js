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
            msg: 'Error 500, please contact admin'
        });
    }
};

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        res.json({
            ok: true,
            msg: 'Google Signin',
            name,
            email,
            picture
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto',
            googleToken
        });

    }

};


module.exports = {
    login,
    googleSignIn
}