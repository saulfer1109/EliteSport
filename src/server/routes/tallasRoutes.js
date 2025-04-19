const express = require('express');
const router = express.Router();
const tallasController = require('../controllers/tallas_controller');

// Rutas para tallas
router.get('/api/tallas', tallasController.obtenerTallas);
router.post('/api/tallas', tallasController.crearTalla);
router.put('/api/tallas/:id', tallasController.editarTalla);
router.delete('/api/tallas/:id', tallasController.eliminarTalla);

module.exports = router;
