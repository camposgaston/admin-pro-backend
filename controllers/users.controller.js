//require response from express in order to have snippets
const { response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/user.model')


const getUsers = async(req, res) => {

    //Filter 
    const users = await User.find({}, 'name lastName email role google');

    res.json({
        ok: true,
        users
    });
};

const newUser = async(req, res = response) => {

    const { email, password, name, lastName } = req.body;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: validationErrors.mapped()
        });
    }

    try {

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist!'
            });
        }

        const user = new User(req.body);
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

module.exports = { getUsers, newUser };