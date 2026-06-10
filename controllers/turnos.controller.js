import { validationResult } from 'express-validator';
import * as turnosService from '../services/turnos.service.js';
import * as turnosData from '../data/turnos.data.js';

export const getTurnos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const rows = await turnosService.getAllTurnos(page, limit);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener turnos' });
    }
};

export const getEstadisticas = async (req, res) => {
    try {
        const estadisticas = await turnosService.getEstadisticas();
        res.json(estadisticas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las estadísticas' });
    }
};

export const getTurnoById = async (req, res) => {
    const { id } = req.params;
    try {
        const turno = await turnosService.getTurnoById(id);
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        res.json(turno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el turno' });
    }
};

export const createTurno = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const insertId = await turnosService.createTurno(req.body);
        const nuevo = await turnosService.getTurnoById(insertId);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el turno' });
    }
};

export const updateTurno = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
        const actualizado = await turnosService.updateTurno(id, req.body);
        if (!actualizado) return res.status(404).json({ message: 'Turno no encontrado' });
        res.json({ message: 'Turno actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el turno' });
    }
};

export const deleteTurno = async (req, res) => {
    const { id } = req.params;
    const borrado = await turnosService.deleteTurno(id);
    borrado ? res.status(200).json({ message: 'Turno eliminado' }) : res.status(404).json({ message: 'Turno no encontrado' });
};

export const marcarAtendido = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await turnosService.marcarAtendido(id);
        if (!actualizado) return res.status(404).json({ message: 'Turno no encontrado' });
        res.json({ message: 'Turno marcado como atendido exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al marcar el turno como atendido' });
    }
};

export const getMisTurnos = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const rol = req.user.id_rol;

        let turnos = [];

        if (rol === 1) {
            turnos = await turnosData.getTurnosByMedicoUsuario(id_usuario);
        } else if (rol === 2) {
            turnos = await turnosData.getTurnosByPacienteUsuario(id_usuario);
        } else {
            return res.status(403).json({ message: 'Los administradores no tienen turnos propios.' });
        }

        res.status(200).json(turnos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los turnos propios' });
    }
};