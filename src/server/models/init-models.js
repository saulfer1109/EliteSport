var DataTypes = require("sequelize").DataTypes;
var _detalle_ventas = require("./detalle_ventas");
var _productos = require("./productos");
var _roles = require("./roles");
var _usuarios = require("./usuarios");
var _ventas = require("./ventas");

function initModels(sequelize) {
  var detalle_ventas = _detalle_ventas(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var ventas = _ventas(sequelize, DataTypes);

  detalle_ventas.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_producto"});
  usuarios.belongsTo(roles, { as: "roletype", foreignKey: "roletype_id"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "roletype_id"});
  ventas.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(ventas, { as: "venta", foreignKey: "id_usuario"});
  detalle_ventas.belongsTo(ventas, { as: "id_venta_venta", foreignKey: "id_venta"});
  ventas.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_venta"});

  return {
    detalle_ventas,
    productos,
    roles,
    usuarios,
    ventas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
