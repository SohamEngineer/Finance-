import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "Finance Management API",
            version: "1.0.0",
            description:
                "API documentation for Finance Management Backend"
        },

        servers: [
            {
                url: "http://localhost:5000"
            }
        ]

    },
    components: {

        securitySchemes: {

            bearerAuth: {

                type: "http",

                scheme: "bearer",

                bearerFormat: "JWT"

            }

        }

    },

    apis: [
        "./src/routes/*.ts"
    ]

};

export const swaggerSpec =
    swaggerJsdoc(options);

export {
    swaggerUi
};