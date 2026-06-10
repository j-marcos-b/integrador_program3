import { check } from 'express-validator';

export const validateCreateMedico = [
    check('documento', 'El documento es obligatorio y numérico').isNumeric(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('nombres', 'Los nombres son obligatorios').notEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    check('contrasenia', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('id_especialidad', 'La especialidad es obligatoria').isInt(),
    check('matricula', 'La matrícula es obligatoria y debe ser numérica').isInt(),
    check('valor_consulta', 'El valor de la consulta es obligatorio y debe ser numérico').isNumeric()
];