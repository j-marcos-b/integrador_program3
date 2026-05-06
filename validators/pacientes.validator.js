import { body } from 'express-validator';

export const validarPaciente = [
    body('id_usuario').isInt({ min: 1 }).withMessage('El id_usuario es obligatorio y debe ser un número entero positivo'),
    body('id_obra_social').isInt({ min: 1 }).withMessage('El id_obra_social es obligatorio y debe ser un número entero positivo')
];
