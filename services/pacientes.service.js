import crypto from 'crypto';
import * as pacientesData from '../data/pacientes.data.js';
import { toPacienteDto, toPacientesDto } from '../dtos/paciente.dto.js';

export const getAllPacientes = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const pacientes = await pacientesData.getAllPacientes(limit, offset);
    return toPacientesDto(pacientes);
};

export const getPacienteById = async (id) => {
    const paciente = await pacientesData.getPacienteById(id);
    return toPacienteDto(paciente);
};

export const createPaciente = async (pacienteData) => {
    const contraseniaHash = crypto.createHash('sha256').update(pacienteData.contrasenia).digest('hex');
    const dataConHash = { ...pacienteData, contrasenia: contraseniaHash };
    
    return await pacientesData.createPaciente(dataConHash);
};

export const updatePaciente = async (id, pacienteData) => {
    const contraseniaHash = crypto.createHash('sha256').update(pacienteData.contrasenia).digest('hex');
    const dataConHash = { ...pacienteData, contrasenia: contraseniaHash };
    
    return await pacientesData.updatePaciente(id, dataConHash);
};

export const deletePaciente = async (id) => {
    return await pacientesData.deletePaciente(id);
};