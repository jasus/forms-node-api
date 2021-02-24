"use strict";
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    "Form",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Form",
    }
  );

  Form.associate = function (models) {
    Form.belongsToMany(models.User, {
      foreignKey: "formId",
      through: models.UserForm,
      as: "users",
    });
    Form.hasOne(models.Menu, { foreignKey: "formId", as: "menu" });
    Form.hasMany(models.Question, { foreignKey: "formId", as: "questions" });
  };

  return Form;
};
