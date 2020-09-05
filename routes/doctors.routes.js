// Route: /api/doctors

const { Router } = require('express');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getDoctors, newDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.controller');

const router = Router();

router.get('/', getDoctors);

router.post('/', [
        jwtValidate,
        check('name', 'El nombre del Doctor es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital al que pertenece el medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        dataValidation
    ],
    newDoctor);


router.put('/:id', [],
    updateDoctor);


router.delete('/:id', deleteDoctor);

module.exports = router;