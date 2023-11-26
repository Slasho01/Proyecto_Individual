const { Router } = require('express');
const getTemperament = require('../controllers/getTemperaments')
const router = Router();
router.get('/', getTemperament);
module.exports = router;