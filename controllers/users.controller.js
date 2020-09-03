//require response from express in order to have snippets
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { jtwGenerator } = require('../helpers/jwt');


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

        //generate token
        const token = await jtwGenerator(user.id);

        res.json({
            ok: true,
            user,
            token
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

        // delete password , google and email fields from req.body
        const { password, google, email, ...data } = req.body;

        // checks if user is sending a new email to update
        if (userDB.email !== email) {

            const emailExist = await User.findOne({ email: email });

            if (emailExist) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El correo ingresado ya pertenece a otro usuario'
                });
            }
            //Email doesn´t exist in db, proceed
            data.email = email;
        }

        //Update user data
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
};

const deleteUser = async(req, res = response) => {

    //TODO token validation and user comprobation
    const uid = req.params.id;


    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con el id ingresado'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        });
    }

};


module.exports = { getUsers, newUser, updateUser, deleteUser };