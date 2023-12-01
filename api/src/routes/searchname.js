const { Router } = require('express');
const { getDogsByName } = require('../controllers/getDogByName')
const router = Router();

router.get('/:name', getDogsByName);

module.exports = router;