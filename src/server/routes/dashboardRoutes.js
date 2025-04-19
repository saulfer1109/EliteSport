const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard_controller');

// Ruta para obtener estadísticas totales
router.get('/total-stats', dashboardController.getTotalStats);

// Ruta para obtener ventas por mes
router.get('/monthly-sales', dashboardController.getMonthlySales);

module.exports = router;
