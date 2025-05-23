const Sequelize = require('sequelize'); // Agregar esta línea

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto', {
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_producto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW') // Aquí se usa Sequelize
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_producto" }]
      }
    ]
  });
};