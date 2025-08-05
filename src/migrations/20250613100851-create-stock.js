"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stocks", {
      stockid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      warehouseid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Warehouses",
          key: "warehouse_id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      minstock: {
        type: Sequelize.INTEGER,
      },
      maxstock: {
        type: Sequelize.INTEGER,
      },
      recordstock: {
        type: Sequelize.INTEGER,
      },
      lastupdatedstock: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    await queryInterface.dropTable("Stocks");
  },
};
