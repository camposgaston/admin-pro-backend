const { response } = require('express');
const jwt = require('jsonwebtoken');

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

module.exports = {
    jwtValidate
};