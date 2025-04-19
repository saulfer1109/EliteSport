const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos_controller');

// Rutas de productos
router.get('/api/productos', productosController.obtenerProductos);
router.post('/api/productos', productosController.crearProducto);
router.put('/api/productos/:id', productosController.editarProducto);
router.delete('/api/productos/:id', productosController.eliminarProducto);

module.exports = router;
