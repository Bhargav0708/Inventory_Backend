"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Users", "addressid", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    // queryInterface.addConstraint("Users", {
    //   fields: ["addressid"],
    //   type: "foreign key",
    //   name: "fk_users_addressid",
    //   references: {
    //     table: "Addresses",
    //     field: "addressid",
    //   },
    // });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.changeColumn("Users", "addressid", {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // });
    queryInterface.removeColumn("Users", "addressid");
    // queryInterface.removeConstraint("Users", "fk_users_addressid");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
