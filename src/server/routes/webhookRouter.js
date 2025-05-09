const express = require('express');
const router = express.Router();
const db = require('../models');
const { frasesPrecio, frasesStock } = require('../utils/frases');

// Ruta POST para el chatbot
router.post('/', async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: 'No recibí ningún mensaje válido.' });
    }

    const textoUsuario = message.trim().toLowerCase();

    // === SALUDO DE BIENVENIDA ===
    if (textoUsuario === 'hola' || textoUsuario.includes('bienvenido')) {
      return res.json({
        reply: '¡Hola! Bienvenido a EliteSport. ¿En qué puedo ayudarte hoy?',
        options: ['Ver productos', 'Consultar stock', 'Hablar con representante']
      });
    }

    // === RESPUESTA PARA VER PRODUCTOS ===
    if (textoUsuario.includes('ver productos')) {
      const productos = await db.Producto.findAll();

      if (productos.length === 0) {
        return res.json({
          reply: 'No se encontraron productos en el inventario.',
          options: ['Volver al inicio']
        });
      }

      const listaProductos = productos.map((producto, index) => 
        `${index + 1}. ${producto.nombre_producto} - $${producto.precio}`
      ).join('\n');

      return res.json({
        reply: `Aquí tienes nuestros productos:\n${listaProductos}`,
        options: ['Consultar stock', 'Hablar con representante', 'Volver al inicio']
      });
    }

    // === RESPUESTA PARA CONSULTAR STOCK ===
    if (textoUsuario.includes('consultar stock')) {
      const productos = await db.Producto.findAll();

      if (productos.length === 0) {
        return res.json({
          reply: 'No se encontraron productos en el inventario.',
          options: ['Volver al inicio']
        });
      }

      const listaStock = productos.map((producto, index) => 
        `${index + 1}. ${producto.nombre_producto} - Stock: ${producto.stock}`
      ).join('\n');

      return res.json({
        reply: `Aquí tienes el stock de nuestros productos:\n${listaStock}`,
        options: ['Ver productos', 'Hablar con representante', 'Volver al inicio']
      });
    }

    // === RESPUESTA PARA HABLAR CON REPRESENTANTE ===
    if (textoUsuario.includes('hablar con representante')) {
      return res.json({
        reply: 'Puedes comunicarte con nuestro representante en:\n📞 Teléfono: 6625551419\n📧 Correo: ValeriaV@gmail.com',
        options: ['Ver productos', 'Consultar stock', 'Volver al inicio']
      });
    }

    // === RESPUESTA PARA CONSULTAR PRECIO O STOCK DE UNA PRENDA ESPECÍFICA ===
    const prendas = ['camisa', 'guante', 'short', 'boxer', 'calceta'];
    const prenda = prendas.find(p => textoUsuario.includes(p));

    if (prenda) {
      const producto = await db.Producto.findOne({
        where: { nombre_producto: { [db.Sequelize.Op.like]: `%${prenda}%` } }
      });

      if (producto) {
        if (frasesStock.some(frase => textoUsuario.includes(frase))) {
          return res.json({
            reply: `Actualmente hay ${producto.stock} ${prenda}(s) disponibles.`,
            options: ['Ver más productos', 'Volver al inicio']
          });
        }

        if (frasesPrecio.some(frase => textoUsuario.includes(frase))) {
          return res.json({
            reply: `El precio de una ${prenda} es $${producto.precio}.`,
            options: ['Ver más productos', 'Volver al inicio']
          });
        }
      } else {
        return res.json({
          reply: `Lo siento, no encontré ninguna prenda llamada "${prenda}".`,
          options: ['Buscar otra prenda', 'Volver al inicio']
        });
      }
    }

    // === RESPUESTA GENÉRICA SI NO SE ENTIENDE EL MENSAJE ===
    return res.json({
      reply: 'No entendí tu solicitud. Puedes decir "ver productos" para empezar.',
      options: ['Ver productos', 'Consultar stock', 'Hablar con representante']
    });

  } catch (error) {
    console.error('Error en webhookrouter:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
