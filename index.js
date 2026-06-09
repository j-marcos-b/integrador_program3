import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import './config/db.js';
import pacientesRoutes from './routes/pacientes.routes.js';
import medicosRoutes from './routes/medicos.routes.js';
import obrasSocialesRoutes from './routes/obras_sociales.routes.js';
import especialidadesRoutes from './routes/especialidades.routes.js';
import turnosRoutes from './routes/turnos.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';

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
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/obras-sociales', obrasSocialesRoutes);
app.use('/api/v1/especialidades', especialidadesRoutes);
app.use('/api/v1/turnos', turnosRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
