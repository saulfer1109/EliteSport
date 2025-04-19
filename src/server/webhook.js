// webhook.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Configuración de la base de datos con Sequelize
const sequelize = new Sequelize('hype_store', 'atepezano', 'atepezano1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// Definir el modelo de producto
const Producto = sequelize.define('productos', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_producto: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.DECIMAL,
  stock: DataTypes.INTEGER
}, {
  timestamps: false
});

// Webhook para Dialogflow
app.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  let responseText = 'Lo siento, no tengo esa información en este momento. Escribe "Ayuda" para ver las opciones';
  let customPayload = null;

  try {
    if (intentName === 'ConsultarPrecios') {
      const nombreProducto = parameters.producto;

      // Consulta a la base de datos para obtener el precio del producto
      const producto = await Producto.findOne({
        where: { nombre_producto: nombreProducto }
      });

      if (producto) {
        responseText = `El precio de ${nombreProducto} es $${producto.precio}.`;
      } else {
        responseText = `No encontré el producto llamado ${nombreProducto}. Escribe "Ayuda" para ver las opciones`;
      }
    } else if (intentName === 'ConsultarStock') {
      const nombreProducto = parameters.producto;

      // Consulta a la base de datos para obtener el stock del producto
      const producto = await Producto.findOne({
        where: { nombre_producto: nombreProducto }
      });

      if (producto) {
        if (producto.stock > 0) {
          responseText = `Sí, tenemos ${nombreProducto} disponible en stock.`;
        } else {
          responseText = `Lo siento, actualmente no tenemos ${nombreProducto} en stock.`;
        }
      } else {
        responseText = `No encontré el producto llamado ${nombreProducto}. Escribe "Ayuda" para ver las opciones`;
      }
    } else if (intentName === 'FAQ') {
      if (parameters.ubicacion) {
        responseText = 'Nos ubicamos en Hermosillo, Sonora';
      } else if (parameters.tiendas) {
        responseText = 'Aún no contamos con sucursales físicas';
      } else if (parameters.contacto) {
        responseText = 'Puedes contactarnos vía mensaje directo de Instagram donde podrá atenderte un integrante de nuestro equipo';
      } else if (parameters.devoluciones) {
        responseText = 'Las devoluciones son válidas 20 días a partir de la compra, ya que contamos con garantía directa con el fabricante';
      } else if (parameters.envios) {
        responseText = 'Sí, contamos con envíos nacionales e internacionales';
      } else {
        responseText = 'Lo siento, no he recibido una pregunta válida. Escribe "Ayuda" para ver las opciones';
      }
    } else if (intentName === 'Default Welcome Intent') {
      // Respuesta de bienvenida personalizada
      responseText = '¡Hola! Bienvenido a Top Hype Store. ¿En qué podemos ayudarte?';
      customPayload = {
        "richContent": [
          [
            {
              "options": [
                { "text": "¿Realizan envíos a todo el país?" },
                { "text": "¿Cuál es su política de devoluciones?" },
                { "text": "¿Cómo puedo contactarlos?" },
                { "text": "¿Tienen tiendas físicas?" },
                { "text": "¿Dónde están ubicados?" }
              ],
              "type": "chips"
            }
          ]
        ]
      };
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    responseText = 'Hubo un error al procesar tu solicitud, por favor intenta más tarde.';
  }

  // Respuesta al webhook de Dialogflow
  const response = customPayload
    ? {
        fulfillmentMessages: [
          { text: { text: [responseText] } },
          { payload: customPayload }
        ]
      }
    : { fulfillmentText: responseText };

  res.json(response);
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de webhook corriendo en el puerto ${PORT}`);
});
