import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import './config/db.js';
import pacientesRoutes from './routes/pacientes.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); // Protege las cabeceras HTTP
app.use(cors());   // Habilita peticiones desde otros dominios
app.use(express.json()); 
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ mensaje: 'Bienvenido a la API de la Clínica Médica' });
});

app.use('/api/v1/pacientes', pacientesRoutes); // Agregamos "v1" para el versionado

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
