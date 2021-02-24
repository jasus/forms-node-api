"use strict";

const { inputValues } = require("../enums/input-types");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Answer", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Question",
          key: "id",
        },
      },
      input: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input_type: {
        type: DataTypes.ENUM,
        values: inputValues,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Answer");
  },
};
