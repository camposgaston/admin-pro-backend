// Path: /api/login
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');
const { jwtValidate } = require('../middlewares/jwt-validation');

const router = Router();

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        dataValidation
    ],
    login
);

router.post('/google', [
        check('token', 'El google token es obligatorio').notEmpty(),
        dataValidation
    ],
    googleSignIn
);

router.get('/renew',
    jwtValidate,
    renewToken
);
module.exports = router;