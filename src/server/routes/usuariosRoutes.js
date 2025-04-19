const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios_controller');

// Rutas para usuarios
router.get('/api/usuarios', usuariosController.obtenerUsuarios);
router.post('/api/usuarios', usuariosController.crearUsuario);
router.put('/api/usuarios/:id', usuariosController.editarUsuario);
router.delete('/api/usuarios/:id', usuariosController.eliminarUsuario);

module.exports = router;
