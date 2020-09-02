// Route: /api/users

const { Router } = require('express');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const { getUsers, newUser, updateUser } = require('../controllers/users.controller');

const router = Router();


router.get('/', getUsers);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatotio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'Favor de verificar que el email ingresado sea correcto, formato erróneo').isEmail(),
        dataValidation
    ],
    newUser);


router.put('/:id', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatotio').not().isEmpty(),
        check('role', 'El Rol es obligatorio').not().isEmpty(),
        check('email', 'Favor de verificar que el email ingresado sea correcto, formato erróneo').isEmail(),
        dataValidation
    ],
    updateUser);

module.exports = router;