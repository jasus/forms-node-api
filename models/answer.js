const { inputValues } = require("../enums/input-types");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ Question }) {
      this.belongsTo(Question, { foreignKey: "questionId", as: "question" });
    }
  }
  Answer.init(
    {
      input: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input_type: {
        type: DataTypes.ENUM,
        values: inputValues,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Question",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Answer",
    }
  );
  return Answer;
};
