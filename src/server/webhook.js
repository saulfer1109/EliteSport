const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS
const cors = require('cors');

app.use(cors({
  origin: '*', // Permitir todas las solicitudes (puedes restringirlo a dominios específicos)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Importar modelo desde models/
const db = require('./models');
const Producto = db.Producto;

// Ruta para Dialogflow
app.post('/webhook', async (req, res) => {
  console.log('Solicitud recibida:', req.body);

  const textoUsuario = req.body.message?.trim().toLowerCase(); // Mensaje del usuario

  if (!textoUsuario) {
    return res.status(400).json({ reply: 'No recibí ningún mensaje válido.' });
  }

  try {
    // === BIENVENIDA ===
    if (textoUsuario === 'hola' || textoUsuario.includes('bienvenido')) {
      return res.json({
        reply: '¡Hola! Bienvenido a EliteSport. ¿En qué puedo ayudarte hoy?',
        options: [
          'Ver productos',
          'Consultar stock',
          'Hablar con representante'
        ]
      });

    // === CONSULTAR STOCK DE PRENDAS ===
    } else if (
      textoUsuario.includes('cuantos') ||
      textoUsuario.includes('stock') ||
      textoUsuario.includes('hay')
    ) {
      const prendas = ['camisa', 'guantes', 'shorts', 'boxers', 'calcetas'];
      const prenda = prendas.find(p => textoUsuario.includes(p));

      if (prenda) {
        const count = await Producto.count({
          where: { nombre_producto: prenda }
        });

        if (count > 0) {
          return res.json({
            reply: `Actualmente hay ${count} ${prenda}(s) disponibles.`,
            options: ['Ver más productos', 'Volver al inicio']
          });
        } else {
          return res.json({
            reply: `Lo siento, no encontré ninguna prenda llamada "${prenda}".`,
            options: ['Buscar otra prenda', 'Volver al inicio']
          });
        }
      } else {
        return res.json({
          reply: '¿De qué prenda hablas? Por ejemplo: camisa, guantes, shorts, boxers o calcetas.',
          options: ['Buscar por nombre', 'Volver al inicio']
        });
      }

    // === VER PRODUCTOS ===
    } else if (textoUsuario.includes('ver productos')) {
      const productos = await Producto.findAll();

      let respuesta = 'Aquí tienes nuestras prendas:\n';
      productos.forEach((p, i) => {
        respuesta += `${i + 1}. ${p.nombre_producto} – $${p.precio} (Stock: ${p.stock})\n`;
      });

      return res.json({
        reply: respuesta,
        options: ['Ver stock', 'Volver al inicio']
      });

    // === OPCIONES ADICIONALES ===
    } else if (textoUsuario.includes('volver') || textoUsuario.includes('inicio')) {
      return res.json({
        reply: '¿En qué puedo ayudarte ahora?',
        options: ['Ver productos', 'Consultar stock', 'Hablar con representante']
      });

    // === DESPEDIDA ===
    } else if (textoUsuario.includes('salir') || textoUsuario.includes('adiós')) {
      return res.json({
        reply: 'Gracias por tu visita. ¡Esperamos verte pronto!'
      });

    // === COMANDO NO RECONOCIDO ===
    } else {
      return res.json({
        reply: 'No entendí eso. Puedes decir "hola" para comenzar.',
        options: ['Iniciar chat', 'Salir']
      });
    }

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.json({
      reply: 'Hubo un problema al conectar con la base de datos.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});