const { Router } = require('express');
const { getDogs, getDogsById, postDog, deleteDog } = require('../controllers/getDogs')
const router = Router();

router.get('/', getDogs);
router.get('/:id', getDogsById);
router.post('/', postDog); 
router.delete('/delete/:id', deleteDog);

module.exports = router;