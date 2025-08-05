"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        roleid: 1,
        role_name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleid: 2,
        role_name: "supplier",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleid: 3,
        role_name: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
