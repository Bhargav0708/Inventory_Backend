"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stocktransactions", {
      stock_transc_id: {
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
      // warehouse_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "Warehouses",
      //     key: "warehouse_id",
      //   },
      // },
      quantity: {
        type: Sequelize.INTEGER,
      },

      transaction_type: {
        type: Sequelize.ENUM("purchase", "sale", "return"),
      },
      notes: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Stocktransactions");
  },
};
