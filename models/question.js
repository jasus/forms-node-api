"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Answer, Form }) {
      this.belongsTo(Form, { foreignKey: "formId", as: "form" });
      this.hasOne(Answer, { foreignKey: "questionId" });
    }
  }
  Question.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Form",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Question",
    }
  );
  return Question;
};
