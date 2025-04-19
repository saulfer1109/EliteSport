const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Tallas = sequelize.define('Tallas', {
    id_talla: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    talla: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tallas',
    timestamps: false,
  });

  return Tallas;
};
