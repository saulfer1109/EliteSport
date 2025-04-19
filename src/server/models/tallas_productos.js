const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const TallasProductos = sequelize.define('TallasProductos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id_producto'
      }
    },
    id_talla: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tallas',
        key: 'id_talla'
      }
    }
  }, {
    sequelize,
    tableName: 'tallas_productos',
    timestamps: false,
  });

  // Definir asociaciones
  TallasProductos.associate = function(models) {
    TallasProductos.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto'
    });

    TallasProductos.belongsTo(models.Tallas, {
      foreignKey: 'id_talla',
      as: 'talla'
    });
  };

  return TallasProductos;
};
