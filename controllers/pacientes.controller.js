import { validationResult } from 'express-validator';
import * as pacientesService from '../services/pacientes.service.js';

export const getPacientes = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const rows = await pacientesService.getAllPacientes(page, limit);
    res.json(rows);
};

export const getPacienteById = async (req, res) => {
    const { id } = req.params;
    const paciente = await pacientesService.getPacienteById(id);

    if (!paciente) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json(paciente);
};

export const createPaciente = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const insertId = await pacientesService.createPaciente(req.body);

        const nuevoPaciente = await pacientesService.getPacienteById(insertId);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el paciente' });
    }
};

export const updatePaciente = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const actualizado = await pacientesService.updatePaciente(id, req.body);

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
    const { id } = req.params;
    const borrado = await pacientesService.deletePaciente(id);

    if (!borrado) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente eliminado exitosamente' });
};