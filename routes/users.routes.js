// Route: /api/users

const { Router } = require('express');
const { getUsers, newUser } = require('../controllers/users.controller');

const router = Router();


router.get('/', getUsers);

router.post('/', newUser);


module.exports = router;