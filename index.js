import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import './config/db.js';
import pacientesRoutes from './routes/pacientes.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); 
app.use(cors());  
app.use(express.json()); 
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({ mensaje: 'Bienvenido a la API de la Clínica Médica' });
});

app.use('/api/v1/pacientes', pacientesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
