"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("CartItems", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      cartId: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Carts", key: "id" },
      },
      productId: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Products", key: "id" },
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
    return queryInterface.dropTable("CartItems");
  },
};
