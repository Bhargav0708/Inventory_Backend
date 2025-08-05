import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Test API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "login_token",
          description: "JWT auth token stored in cookie",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["src/routes/*.ts"], // your routes path
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
