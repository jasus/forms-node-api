"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserForm = sequelize.define(
    "UserForm",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      formId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Form",
          key: "id",
        },
      },
    },
    {
      tableName: "UserForm",
    }
  );

  UserForm.associate = function (models) {
    UserForm.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    UserForm.belongsTo(models.Form, { foreignKey: "formId", as: "form" });
  };

  return UserForm;
};
