// Route: /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator');
const { dataValidation } = require('../middlewares/data-validation');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getHospitals, newHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');

const router = Router();

router.get('/', getHospitals);

router.post('/', [],
    newHospital);


router.put('/:id', [],
    updateHospital);


router.delete('/:id', deleteHospital);

module.exports = router;