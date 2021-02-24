"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Menu", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subMenuId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Menu",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      route: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Form",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Menu");
  },
};
