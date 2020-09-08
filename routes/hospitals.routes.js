// Route: /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getHospitals, newHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');

const router = Router();

router.get('/', jwtValidate, getHospitals);

router.post('/', [
        jwtValidate,
        check('name', 'El nombre del Hospital es necesario').not().isEmpty(),
        // check('createdBy', 'El id usuario no fue correctamente recibido').not().isEmpty(),
        dataValidation
    ],
    newHospital);


router.put('/:id', [
        jwtValidate,
        check('name', 'El nombre del Hospital es necesario').not().isEmpty(),
        // check('createdBy', 'El id usuario no fue correctamente recibido').not().isEmpty(),
        dataValidation
    ],
    updateHospital);


router.delete('/:id', jwtValidate, deleteHospital);

module.exports = router;