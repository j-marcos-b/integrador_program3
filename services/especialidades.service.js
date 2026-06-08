import * as especialidadesData from '../data/especialidades.data.js';
import { toEspecialidadDto, toEspecialidadesDto } from '../dtos/especialidad.dto.js';

export const getAllEspecialidades = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const especialidades = await especialidadesData.getAllEspecialidades(limit, offset);
    return toEspecialidadesDto(especialidades);
};

export const getEspecialidadById = async (id) => {
    const especialidad = await especialidadesData.getEspecialidadById(id);
    return toEspecialidadDto(especialidad);
};

export const createEspecialidad = async (especialidadData) => {
    return await especialidadesData.createEspecialidad(especialidadData);
};

export const updateEspecialidad = async (id, especialidadData) => {
    return await especialidadesData.updateEspecialidad(id, especialidadData);
};

export const deleteEspecialidad = async (id) => {
    return await especialidadesData.deleteEspecialidad(id);
};