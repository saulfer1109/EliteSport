const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ventas', {
    id_venta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Cambiado a Sequelize.fn('NOW') para ser más compatible
    },
  }, {
    sequelize,
    tableName: 'ventas',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id_venta' },
        ],
      },
      {
        name: 'id_usuario',
        using: 'BTREE',
        fields: [
          { name: 'id_usuario' },
        ],
      },
    ],
  });
};
