// Route: /api/all/:search

const { Router } = require('express');

const { jwtValidate } = require('../middlewares/jwt-validation');

const { getAllSearch, getCollectionSearch } = require('../controllers/searchs.controller');

const router = Router();

router.get('/:search', jwtValidate, getAllSearch);

router.get('/collection/:collection/:search', jwtValidate, getCollectionSearch);

module.exports = router;