"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permission", [
      {
        permissionid: 1,
        permission_name: "create-product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 2,
        permission_name: "view-product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 3,
        permission_name: "update-product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 4,
        permission_name: "delete-product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 5,
        permission_name: "create-stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 6,
        permission_name: "view-stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 7,
        permission_name: "update-stock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionid: 8,
        permission_name: "delete-stock",
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
    return queryInterface.bulkDelete("Permission", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
