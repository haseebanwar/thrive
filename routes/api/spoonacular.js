const router = require('express').Router();
const { get } = require('../../controllers/spoonacular');

router.get('*', get);

module.exports = router;
