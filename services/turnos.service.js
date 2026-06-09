import * as turnosData from '../data/turnos.data.js';
import { toTurnoDto, toTurnosDto } from '../dtos/turno.dto.js';

export const getAllTurnos = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const turnos = await turnosData.getAllTurnos(limit, offset);
    return toTurnosDto(turnos);
};

export const getTurnoById = async (id) => {
    const turno = await turnosData.getTurnoById(id);
    return toTurnoDto(turno);
};

export const createTurno = async (turnoData) => {
    return await turnosData.createTurno(turnoData);
};

export const updateTurno = async (id, turnoData) => {
    return await turnosData.updateTurno(id, turnoData);
};

export const deleteTurno = async (id) => {
    return await turnosData.deleteTurno(id);
};