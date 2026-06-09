import { check } from 'express-validator';

export const validateAssignObraSocial = [
    check('id_medico', 'El ID del médico es obligatorio y debe ser numérico').isInt(),
    check('id_obra_social', 'El ID de la obra social es obligatorio y debe ser numérico').isInt()
];