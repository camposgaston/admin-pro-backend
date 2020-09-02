//require response from express in order to have snippets
const { response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user.model');



const getUsers = async(req, res) => {

    //Filter 
    const users = await User.find({}, 'name lastName email role google');

    res.json({
        ok: true,
        users
    });
};

const newUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist!'
            });
        }

        const user = new User(req.body);


        //Password Encryption
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // create user
        await user.save();
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }


};

const updateUser = async(req, res = response) => {

    //TODO token validation and user comprobation
    const uid = req.params.id;


    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existeningun usuario con el id ingresado'
            });
        }

        //Update user data
        const data = req.body;

        if (userDB.email === req.body.email) {
            delete data.email;
        } else {

            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El correo ingresado ya pertenece a optro usuario'
                });
            }

        }



        delete data.password;
        delete data.google;
        //delete data.email;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }
}


module.exports = { getUsers, newUser, updateUser };