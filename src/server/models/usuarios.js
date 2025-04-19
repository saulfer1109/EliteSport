const Sequelize = require('sequelize');
const bcrypt = require('bcrypt'); // Importar bcrypt para hashear la contraseña

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío"
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Este email ya está registrado"
      },
      validate: {
        isEmail: {
          msg: "Debe ser un correo electrónico válido"
        },
        notEmpty: {
          msg: "El email no puede estar vacío"
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La contraseña no puede estar vacía"
        }
      }
    },
    roletype_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'roletype_id'
      }
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    },
    // Elimina el defaultScope para incluir el campo 'password' en todas las consultas
    // defaultScope: {
    //   attributes: { exclude: ['password'] }
    // },
    // Puedes eliminar los scopes si no los vas a utilizar
    // scopes: {
    //   withPassword: {
    //     attributes: {}
    //   }
    // },
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" }
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" }
        ]
      },
      {
        name: "roletype_id",
        using: "BTREE",
        fields: [
          { name: "roletype_id" }
        ]
      }
    ]
  });

  // Método para comparar contraseñas
  Usuario.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return Usuario;
};
