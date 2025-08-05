"use strict";

const { DataType } = require("sequelize-typescript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Products", "imgae_url", {
      type: DataType.STRING,
      allowNull: true,
    });
    // queryInterface.removeColumn("Products", "imgae_url");
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Products", "imgae_url");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
