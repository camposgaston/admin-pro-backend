// Route: /api/upload/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { jwtValidate } = require('../middlewares/jwt-validation');
const { fileUpload, returnImg } = require('../controllers/uploads.controller');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', jwtValidate, fileUpload);
router.get('/:collection/:img', jwtValidate, returnImg);

module.exports = router;