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
    username: "postgres",
    password: "Dev@123",
    database: "Inventory",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "Dev@123",
    database: "Inventory",
    host: "127.0.0.1",
    dialect: "postgres",
  },

  production: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
