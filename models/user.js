"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "User",
    }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Form, {
      foreignKey: "userId",
      through: models.UserForm,
      as: "forms",
    });
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return User;
};
