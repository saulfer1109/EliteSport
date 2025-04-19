// usuarios_controller

// Importamos los modelos desde la carpeta `models`
const db = require('../models');

// Controlador para obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    // Obtenemos todos los usuarios de la base de datos
    const usuarios = await db.usuarios.findAll();
    // Enviamos la lista de usuarios en formato JSON
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Controlador para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    // Extraemos los datos del cuerpo de la solicitud
    const { nombre, email, password, roletype_id } = req.body;

    // Creamos un nuevo usuario en la base de datos
    const nuevoUsuario = await db.usuarios.create({
      nombre,
      email,
      password,
      roletype_id: roletype_id || null, // Si no se proporciona 'roletype_id', se establece como null
    });

    // Enviamos el usuario creado en la respuesta con código 201 (Creado)
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Controlador para editar un usuario existente
exports.editarUsuario = async (req, res) => {
  try {
    // Obtenemos el ID del usuario de los parámetros de la ruta
    const { id } = req.params;
    // Extraemos los datos actualizados del cuerpo de la solicitud
    const { nombre, email, password, roletype_id } = req.body;

    // Actualizamos el usuario en la base de datos
    const usuarioActualizado = await db.usuarios.update(
      { nombre, email, password, roletype_id },
      { where: { id_usuario: id } } // Condición para encontrar el usuario a actualizar
    );

    if (usuarioActualizado[0] > 0) {
      // Si se actualizó al menos un registro, enviamos un mensaje de éxito
      res.json({ message: 'Usuario actualizado exitosamente' });
    } else {
      // Si no se encontró el usuario, enviamos un error 404
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// Controlador para eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    // Obtenemos el ID del usuario de los parámetros de la ruta
    const { id } = req.params;
    // Eliminamos el usuario de la base de datos
    const deleted = await db.usuarios.destroy({ where: { id_usuario: id } });

    if (deleted) {
      // Si se eliminó correctamente, enviamos un mensaje de éxito
      res.json({ message: 'Usuario eliminado exitosamente' });
    } else {
      // Si no se encontró el usuario, enviamos un error 404
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
