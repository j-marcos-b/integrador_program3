import { validationResult } from 'express-validator';
import * as especialidadesService from '../services/especialidades.service.js';

export const getEspecialidades = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const rows = await especialidadesService.getAllEspecialidades(page, limit);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener especialidades' });
    }
};

export const getEspecialidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const especialidad = await especialidadesService.getEspecialidadById(id);
        if (!especialidad) {
            return res.status(404).json({ message: 'Especialidad no encontrada' });
        }
        res.json(especialidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la especialidad' });
    }
};

export const createEspecialidad = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const insertId = await especialidadesService.createEspecialidad(req.body);
        const nueva = await especialidadesService.getEspecialidadById(insertId);
        res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la especialidad' });
    }
};

export const updateEspecialidad = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
        const actualizado = await especialidadesService.updateEspecialidad(id, req.body);
        if (!actualizado) return res.status(404).json({ message: 'Especialidad no encontrada' });
        res.json({ message: 'Especialidad actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la especialidad' });
    }
};

export const deleteEspecialidad = async (req, res) => {
    const { id } = req.params;
    const borrado = await especialidadesService.deleteEspecialidad(id);
    borrado ? res.status(200).json({ message: 'Especialidad eliminada' }) : res.status(404).json({ message: 'No encontrada' });
};