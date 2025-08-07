"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        cateogry_id: 1,
        name: "Electronics",
        description: "Electronics_cateogry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cateogry_id: 2,
        name: "Electronics2",
        description: "Electronics_cateogry2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cateogry_id: 3,
        name: "Electronics3",
        description: "Electronics_cateogry3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cateogry_id: 4,
        name: "Electronics4",
        description: "Electronics_cateogry4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
