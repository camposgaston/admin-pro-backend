// Route: /api/doctors

const { Router } = require('express');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getDoctors, newDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.controller');

const router = Router();

router.get('/', getDoctors);

router.post('/', [],
    newDoctor);


router.put('/:id', [],
    updateDoctor);


router.delete('/:id', deleteDoctor);

module.exports = router;