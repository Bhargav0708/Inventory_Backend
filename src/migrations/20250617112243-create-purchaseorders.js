"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Purchaseorders", {
      purchase_order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unit_price: {
        type: Sequelize.INTEGER,
      },
      total_amount: {
        type: Sequelize.BIGINT,
      },
      order_date: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      order_status: {
        type: Sequelize.ENUM("pending", "confirmed", "received", "cancelled"),
        defaultValue: "pending",
      },
      expected_receive_date: {
        type: Sequelize.DATE,
      },
      actual_receive_date: {
        type: Sequelize.DATE,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Payments",
          key: "paymentid",
        },
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
    await queryInterface.dropTable("Purchaseorders");
  },
};
