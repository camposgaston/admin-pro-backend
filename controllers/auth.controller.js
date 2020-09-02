const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

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

        res.status(200).json({
            ok: true,
            msg: 'ingreso Correcto'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500, please contact admin'
        });
    }
};


module.exports = {
    login
}