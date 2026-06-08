import { check } from 'express-validator';

export const validateCreateObraSocial = [
    check('nombre', 'El nombre es obligatorio').notEmpty().isString(),
    check('descripcion', 'La descripción debe ser texto').optional().isString(),
    check('porcentaje_descuento', 'El porcentaje de descuento es obligatorio y debe ser un número').isNumeric(),
    check('es_particular', 'Debe ser un valor booleano o numérico (0 o 1)').optional().isBoolean({ loose: true })
];