const db = require('../models'); // Importamos los modelos desde el directorio '../models'

// Controlador para obtener todas las tallas
exports.obtenerTallas = async (req, res) => {
  try {
    // Consultamos todas las tallas en la base de datos
    const tallas = await db.Tallas.findAll();
    // Enviamos las tallas obtenidas en formato JSON
    res.json(tallas);
  } catch (error) {
    console.error('Error al obtener las tallas:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al obtener las tallas', error: error.message });
  }
};

// Controlador para crear una nueva talla
exports.crearTalla = async (req, res) => {
  try {
    const { talla } = req.body; // Obtenemos el valor de 'talla' del cuerpo de la solicitud
    // Creamos una nueva entrada en la tabla 'Tallas' con el valor proporcionado
    const nuevaTalla = await db.Tallas.create({ talla });
    console.log('Talla creada:', nuevaTalla);
    // Enviamos la nueva talla creada en formato JSON
    res.json(nuevaTalla);
  } catch (error) {
    console.error('Error al crear la talla:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al crear la talla', error: error.message });
  }
};

// Controlador para editar una talla existente
exports.editarTalla = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID de la talla de los parámetros de la ruta
    const { talla } = req.body; // Obtenemos el nuevo valor de 'talla' del cuerpo de la solicitud

    // Actualizamos la talla en la base de datos donde el 'id_talla' coincida con el ID proporcionado
    const tallaActualizada = await db.Tallas.update(
      { talla }, // Campos a actualizar
      { where: { id_talla: id } } // Condición para seleccionar la talla a actualizar
    );

    if (tallaActualizada[0] > 0) {
      // Si se actualizó al menos un registro, enviamos una respuesta de éxito
      console.log(`Talla con ID ${id} actualizada`);
      res.json({ success: true });
    } else {
      // Si no se encontró la talla, enviamos un error 404
      res.status(404).json({ error: 'Talla no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la talla:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al actualizar la talla', error: error.message });
  }
};

// Controlador para eliminar una talla
exports.eliminarTalla = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID de la talla a eliminar de los parámetros de la ruta
    // Eliminamos la talla de la base de datos donde el 'id_talla' coincida con el ID proporcionado
    const deleted = await db.Tallas.destroy({ where: { id_talla: id } });

    if (deleted) {
      // Si se eliminó exitosamente, enviamos una respuesta de éxito
      console.log(`Talla con ID ${id} eliminada`);
      res.json({ success: true });
    } else {
      // Si no se encontró la talla, enviamos un error 404
      res.status(404).json({ error: 'Talla no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la talla:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al eliminar la talla', error: error.message });
  }
};
