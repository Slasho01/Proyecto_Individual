const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs')
const searchRouter = require('./searchname')
const temperamentRouter = require('./temperament')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter)
router.use('/search', searchRouter)
router.use('/temperament', temperamentRouter)

module.exports = router;
