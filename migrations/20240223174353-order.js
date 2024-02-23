"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "placed",
      }, // statuses: placed, shipped, delivered
      totalAmount: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      details: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Orders");
  },
};
