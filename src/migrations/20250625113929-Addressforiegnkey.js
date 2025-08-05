"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint("Users", {
      fields: ["addressid"],
      type: "foreign key",
      name: "fk_users_addressid",
      references: {
        table: "Addresses",
        field: "addressid",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Users", "fk_users_addressid");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
