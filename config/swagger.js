import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Clínica Médica',
            version: '1.0.0',
            description: 'Documentación de la API para la gestión de pacientes',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Servidor Local',
            },
        ],
    },
    apis: ['./routes/*.routes.js'],
};

export default swaggerJSDoc(options);