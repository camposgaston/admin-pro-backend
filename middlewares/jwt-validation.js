const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const jwtValidate = (req, res = response, next) => {
    //Read token header
    const token = req.header('token');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se recibio token'
        });
    }

    //token validation

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }
};

const adminRoleValidate = async(req, res = response, next) => {

    const uid = req.uid;
    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(401).json({
                ok: false,
                msg: 'usuario no existe en base de datos'
            });
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'usuario no autorizado'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error 500, consulte al administrador'
        });
    }
}

module.exports = {
    jwtValidate,
    adminRoleValidate
};