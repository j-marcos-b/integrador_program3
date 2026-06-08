import { validationResult } from 'express-validator';
import * as obrasSocialesService from '../services/obras_sociales.service.js';

export const getObrasSociales = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const rows = await obrasSocialesService.getAllObrasSociales(page, limit);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener obras sociales' });
    }
};

export const getObraSocialById = async (req, res) => {
    const { id } = req.params;
    try {
        const obraSocial = await obrasSocialesService.getObraSocialById(id);
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra social no encontrada' });
        }
        res.json(obraSocial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la obra social' });
    }
};

export const createObraSocial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const insertId = await obrasSocialesService.createObraSocial(req.body);
        const nueva = await obrasSocialesService.getObraSocialById(insertId);
        res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la obra social' });
    }
};

export const updateObraSocial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
        const actualizado = await obrasSocialesService.updateObraSocial(id, req.body);
        if (!actualizado) return res.status(404).json({ message: 'Obra social no encontrada' });
        res.json({ message: 'Obra social actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la obra social' });
    }
};

export const deleteObraSocial = async (req, res) => {
    const { id } = req.params;
    const borrado = await obrasSocialesService.deleteObraSocial(id);
    borrado ? res.status(200).json({ message: 'Obra social eliminada' }) : res.status(404).json({ message: 'No encontrada' });
};