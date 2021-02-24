"use strict";

// const { User } = require("../models/user")
// const { Form } = require("../models/form")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserForm", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      formId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Form",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserForm");
  },
};
