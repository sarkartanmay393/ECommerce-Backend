"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        id: "1",
        title: "Project",
        price: "435.3",
        description:
          "Popular religious responsibility few social enough large most.\nInteresting only carry hour life. Room term amount back light.",
        availability: "False",
        categoryId: "9",
      },
      {
        id: "2",
        title: "Last",
        price: "563.61",
        description:
          "If action arrive baby. Especially white thus involve program like forget.\nHe coach address race. Actually most kid hot any soldier. Together TV scientist land value.",
        availability: "True",
        categoryId: "10",
      },
      {
        id: "3",
        title: "Natural",
        price: "450.2",
        description:
          "Any name high commercial scientist. Wind realize social fish hard performance.",
        availability: "False",
        categoryId: "8",
      },
      {
        id: "4",
        title: "West",
        price: "465.98",
        description:
          "Create culture take across. Summer nice draw I. Already against end power help son.\nBed change nearly also. Certainly PM account however pick money none.\nArticle quality conference executive develop.",
        availability: "False",
        categoryId: "2",
      },
      {
        id: "5",
        title: "Travel",
        price: "496.05",
        description:
          "Yeah service clearly seven authority wide fish. Coach up cut much.\nTotal building again worker dinner upon.",
        availability: "True",
        categoryId: "2",
      },
      {
        id: "6",
        title: "Just",
        price: "277.55",
        description:
          "Use cup exactly must resource. Trouble social hair. Very foot form machine. Test near health test.\nSupport somebody could. Measure plan society program.",
        availability: "False",
        categoryId: "6",
      },
      {
        id: "7",
        title: "College",
        price: "642.84",
        description:
          "Minute follow whatever stand opportunity reason show. Yourself about her usually finally.\nOil energy none first magazine.",
        availability: "False",
        categoryId: "8",
      },
      {
        id: "8",
        title: "Guy",
        price: "301.78",
        description:
          "Like common away. Thank manage between under wide help. Art wish front concern physical raise.\nPick world run song pull member.\nGreat capital total occur shoulder debate amount. Themselves huge race.",
        availability: "False",
        categoryId: "6",
      },
      {
        id: "9",
        title: "Responsibility",
        price: "853.02",
        description:
          "Build shake range deal close. Now begin forget talk any clearly. Officer situation fear finally position.",
        availability: "False",
        categoryId: "10",
      },
      {
        id: "10",
        title: "Drug",
        price: "674.51",
        description:
          "Collection stand shoulder record marriage agency difference. Story hard anyone guy hand relationship indicate team.\nBoth term pull.",
        availability: "False",
        categoryId: "7",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
