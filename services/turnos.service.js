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
    // 1. Buscamos los datos para el cálculo
    const { medico, obraSocial } = await turnosData.getDatosParaCalculo(turnoData.id_medico, turnoData.id_obra_social);
    
    if (medico && obraSocial) {
        const valorConsulta = Number(medico.valor_consulta);
        
        // 2. Regla de negocio del TP
        if (obraSocial.es_particular === 1) {
            turnoData.valor_total = valorConsulta;
        } else {
            const porcentaje = Number(obraSocial.porcentaje_descuento) / 100;
            turnoData.valor_total = valorConsulta - (porcentaje * valorConsulta);
        }
    }

    return await turnosData.createTurno(turnoData);
};

export const updateTurno = async (id, turnoData) => {
    return await turnosData.updateTurno(id, turnoData);
};

export const marcarAtendido = async (id) => {
    return await turnosData.marcarAtendido(id);
};

export const deleteTurno = async (id) => {
    return await turnosData.deleteTurno(id);
};