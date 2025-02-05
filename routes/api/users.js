const express = require('express');
const { registerUser, loginUser, getUser } = require('../../controllers/users');
const auth = require('../../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(auth, getUser);

module.exports = router;
