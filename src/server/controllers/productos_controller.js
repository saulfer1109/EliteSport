// productos_controller

// Importamos el modelo 'Producto' desde el archivo de modelos de productos
const { Producto } = require('../models/productos'); // Asegúrate de que el modelo esté correctamente definido

// Configuración para subir imágenes (si es necesario, se puede agregar aquí)

// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    // Obtenemos todos los productos de la base de datos
    const listaProductos = await Producto.findAll();
    console.log('Productos obtenidos:', listaProductos);
    // Enviamos la lista de productos en formato JSON
    res.json(listaProductos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    // Extraemos los datos del cuerpo de la solicitud
    const { nombre_producto, precio, stock } = req.body;
    // Creamos un nuevo producto en la base de datos
    const nuevoProducto = await Producto.create({
      nombre_producto,
      precio: parseFloat(precio), // Convertimos el precio a número decimal
      stock: parseInt(stock),     // Convertimos el stock a número entero
    });
    console.log('Producto creado:', nuevoProducto);
    // Enviamos el producto creado en la respuesta
    res.json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
};

// Controlador para editar un producto existente
const editarProducto = async (req, res) => {
  try {
    // Obtenemos el ID del producto de los parámetros de la ruta
    const { id } = req.params;
    // Extraemos los datos actualizados del cuerpo de la solicitud
    const { nombre_producto, precio, stock } = req.body;

    // Actualizamos el producto en la base de datos
    const productoActualizado = await Producto.update(
      {
        nombre_producto,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: req.file ? req.file.path : undefined, // Si se subió una nueva imagen, actualizamos la ruta
      },
      { where: { id_producto: id } } // Condición para encontrar el producto a actualizar
    );

    console.log('Producto actualizado:', productoActualizado);
    // Enviamos una respuesta indicando éxito
    res.json({ success: true });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
};

// Controlador para eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    // Obtenemos el ID del producto de los parámetros de la ruta
    const { id } = req.params; // Asegúrate de que este parámetro esté correcto
    // Eliminamos el producto de la base de datos
    const deleted = await Producto.destroy({ where: { id_producto: id } });
    if (deleted) {
      console.log(`Producto con ID ${id} eliminado`);
      // Enviamos una respuesta indicando éxito
      res.json({ success: true });
    } else {
      // Si no se encontró el producto, enviamos un error 404
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    // En caso de error, enviamos una respuesta con código 500 y un mensaje de error
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// Exportamos los controladores para ser utilizados en las rutas
module.exports = {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
