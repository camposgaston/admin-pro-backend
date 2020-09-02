// Path: /api/login
const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const router = Router();

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        dataValidation
    ],
    login
);

module.exports = router;