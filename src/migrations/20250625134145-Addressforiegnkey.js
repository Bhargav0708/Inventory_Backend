"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Addresses", "Addresses_userid_fkey");
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addConstraint("Addresses", {
      fields: ["userid"],
      type: "foreign key",
      name: "Addresses_userid_fkey",
      references: {
        table: "Users",
        field: "id",
      },
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
