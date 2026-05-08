import * as pacientesData from '../data/pacientes.data.js';

export const getAllPacientes = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await pacientesData.getAllPacientes(limit, offset);
};

export const getPacienteById = async (id) => {
    return await pacientesData.getPacienteById(id);
};

export const createPaciente = async (id_usuario, id_obra_social) => {
    return await pacientesData.createPaciente(id_usuario, id_obra_social);
};

export const updatePaciente = async (id, id_usuario, id_obra_social) => {
    return await pacientesData.updatePaciente(id, id_usuario, id_obra_social);
};

export const deletePaciente = async (id) => {
    return await pacientesData.deletePaciente(id);
};