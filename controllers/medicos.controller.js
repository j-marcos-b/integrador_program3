import { validationResult } from 'express-validator';
import * as medicosService from '../services/medicos.service.js';

export const getMedicos = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const rows = await medicosService.getAllMedicos(page, limit);
    res.json(rows);
};

export const getMedicoById = async (req, res) => {
    const { id } = req.params;
    const medico = await medicosService.getMedicoById(id);

    if (!medico) {
        return res.status(404).json({ message: 'Médico no encontrado' });
    }

    res.json(medico);
};

export const createMedico = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const insertId = await medicosService.createMedico(req.body);

        const nuevoMedico = await medicosService.getMedicoById(insertId);
        res.status(201).json(nuevoMedico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el médico' });
    }
};

export const updateMedico = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const actualizado = await medicosService.updateMedico(id, req.body);

        if (!actualizado) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }

        res.json({ message: 'Médico actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el médico' });
    }
};

export const deleteMedico = async (req, res) => {
    const { id } = req.params;
    const borrado = await medicosService.deleteMedico(id);

    if (!borrado) {
        return res.status(404).json({ message: 'Médico no encontrado' });
    }

    res.status(200).json({ message: 'Médico eliminado exitosamente' });
};