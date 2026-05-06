import { Router } from 'express';
import {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
} from '../controllers/pacientes.controller.js';
import { validarPaciente } from '../validators/pacientes.validator.js';

const router = Router();

router.get('/', getPacientes);

router.get('/:id', getPacienteById);

router.post('/', validarPaciente, createPaciente);

router.put('/:id', validarPaciente, updatePaciente);

router.delete('/:id', deletePaciente);

export default router;