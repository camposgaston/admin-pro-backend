// Route: /api/all/:search

const { Router } = require('express');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getAllSearch } = require('../controllers/searchs.controller');

const router = Router();

router.get('/:search', jwtValidate, getAllSearch);

module.exports = router;