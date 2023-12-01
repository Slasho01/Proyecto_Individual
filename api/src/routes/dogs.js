const { Router } = require('express');
const { getDogs, getDogsById, postDog } = require('../controllers/getDogs')
const router = Router();

router.get('/', getDogs);
router.get('/:id', getDogsById);
router.post('/', postDog); 

module.exports = router;