import { check } from 'express-validator';

export const validateCreateTurno = [
    check('id_medico', 'El ID del médico es obligatorio y debe ser numérico').isInt(),
    check('id_paciente', 'El ID del paciente es obligatorio y debe ser numérico').isInt(),
    check('id_obra_social', 'El ID de la obra social es obligatorio y debe ser numérico').isInt(),
    check('fecha_hora', 'La fecha y hora es obligatoria').notEmpty()
];