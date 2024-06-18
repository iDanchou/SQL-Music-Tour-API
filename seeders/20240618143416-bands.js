"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bands", [
      {
        name: "The Beatles",
        genre: "Rock",
        available_start_time: new Date(),
        end_time: new Date(),
      },
      {
        name: "The Rolling Stones",
        genre: "Rock",
        available_start_time: new Date(),
        end_time: new Date(),
      },
      {
        name: "The Who",
        genre: "Rock",
        available_start_time: new Date(),
        end_time: new Date(),
      },
      {
        name: "The Kinks",
        genre: "Rock",
        available_start_time: new Date(),
        end_time: new Date(),
      },
    ]);

    async function down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("bands", null, {});
    }
  },
};
