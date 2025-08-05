"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stockalerts", {
      stock_alert_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Warehouses",
          key: "warehouse_id",
        },
      },
      alert_type: {
        type: Sequelize.ENUM("low_stock", "out_of_stock", "overstock"),
      },
      current_quantity: {
        type: Sequelize.INTEGER,
      },
      threshold_quantity: {
        type: Sequelize.INTEGER,
      },
      is_resolved: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stockalerts");
  },
};
