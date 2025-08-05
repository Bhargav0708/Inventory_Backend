"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      paymentid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_personid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Purchaseorders",
          key: "purchase_order_id",
        },
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      payment_method: {
        type: Sequelize.ENUM("cash", "online", "credit_card", "bank_transfer"),
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "paid", "failed"),
      },
      payment_time: {
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
    await queryInterface.dropTable("Payments");
  },
};
