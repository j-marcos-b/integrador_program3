import { body } from 'express-validator';

export const validarPaciente = [
    body('documento').notEmpty().withMessage('El documento es obligatorio').isString(),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio').isString(),
    body('nombres').notEmpty().withMessage('El nombre es obligatorio').isString(),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('contrasenia').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('id_obra_social').isInt({ min: 1 }).withMessage('El id_obra_social es obligatorio y debe ser un número entero positivo')
];
