import { check } from 'express-validator';

export const validateCreateEspecialidad = [
    check('nombre', 'El nombre es obligatorio').notEmpty().isString()
];