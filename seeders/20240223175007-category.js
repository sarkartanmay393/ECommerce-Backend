"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        id: "1",
        name: "campaign",
      },
      {
        id: "2",
        name: "edge",
      },
      {
        id: "3",
        name: "product",
      },
      {
        id: "4",
        name: "trouble",
      },
      {
        id: "5",
        name: "yes",
      },
      {
        id: "6",
        name: "authority",
      },
      {
        id: "7",
        name: "soldier",
      },
      {
        id: "8",
        name: "individual",
      },
      {
        id: "9",
        name: "main",
      },
      {
        id: "10",
        name: "Mrs",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
