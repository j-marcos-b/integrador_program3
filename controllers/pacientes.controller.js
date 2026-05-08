import { validationResult } from 'express-validator';
import * as pacientesService from '../services/pacientes.service.js';

export const getPacientes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;

        const rows = await pacientesService.getAllPacientes(page, limit);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pacientes' });
    }
};

export const getPacienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await pacientesService.getPacienteById(id);

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el paciente' });
    }
};

export const createPaciente = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_usuario, id_obra_social } = req.body;

        const insertId = await pacientesService.createPaciente(id_usuario, id_obra_social);

        res.status(201).json({
            message: 'Paciente creado exitosamente',
            id_paciente: insertId,
            id_usuario,
            id_obra_social
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el paciente' });
    }
};

export const updatePaciente = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { id_usuario, id_obra_social } = req.body;

        const actualizado = await pacientesService.updatePaciente(id, id_usuario, id_obra_social);

        if (!actualizado) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json({ message: 'Paciente actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el paciente' });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await pacientesService.deletePaciente(id);

        if (!borrado) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el paciente' });
    }
};