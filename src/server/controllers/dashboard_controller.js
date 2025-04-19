// dashboard_controller:

// Importamos todos los modelos desde la carpeta `models`
const db = require('../models'); // Importa todos los modelos de la carpeta `models`
const Ventas = db.ventas; // Asigna específicamente el modelo `ventas`

// Controlador para obtener estadísticas totales de ventas y pedidos
exports.getTotalStats = async (req, res) => {
  try {
    // Calculamos la suma total de las ventas
    const totalSales = await Ventas.sum('total');
    // Contamos el número total de pedidos
    const totalOrders = await Ventas.count();

    // Enviamos las estadísticas en la respuesta
    res.status(200).json({
      totalSales,
      totalOrders,
    });
  } catch (error) {
    console.error('Error al obtener estadísticas totales:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al obtener estadísticas totales' });
  }
};

// Controlador para obtener ventas por mes
exports.getMonthlySales = async (req, res) => {
  const { month } = req.query; // Obtenemos el mes desde los parámetros de consulta

  try {
    // Calculamos la suma total de ventas para el mes especificado
    const monthlySales = await Ventas.sum('total', {
      where: db.Sequelize.where(
        db.Sequelize.fn('MONTH', db.Sequelize.col('fecha_venta')), // Obtenemos el mes de la fecha de venta
        month // Comparamos con el mes proporcionado
      ),
    });

    // Enviamos las ventas mensuales en la respuesta
    res.status(200).json({
      monthlySales,
    });
  } catch (error) {
    console.error('Error al obtener ventas mensuales:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al obtener ventas mensuales' });
  }
};
