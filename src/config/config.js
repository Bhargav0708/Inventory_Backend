// import {} from "dotenv";
require("dotenv").config();
module.exports = {
  // development: {
  //   use_env_variable: "DB_USER",
  //   use_env_variable: "DB_PASS",
  //   use_env_variable: "DB_NAME",
  //   use_env_variable: "DB_HOST",
  //   dialect: "postgres",
  // },
  // development: {
  //   username: "postgres",
  //   password: "Dev@123",
  //   database: "Inventory",
  //   host: "127.0.0.1",
  //   dialect: "postgres",
  // },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST2,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: "postgres",
    password: "Dev@123",
    database: "Inventory",
    host: "127.0.0.1",
    dialect: "postgres",
  },

  production: {
    username: "postgres",
    password: "Dev@123",
    database: "Inventory",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
