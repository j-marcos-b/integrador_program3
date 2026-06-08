import crypto from 'crypto';
import * as medicosData from '../data/medicos.data.js';
import { toMedicoDto, toMedicosDto } from '../dtos/medico.dto.js';

export const getAllMedicos = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const medicos = await medicosData.getAllMedicos(limit, offset);
    return toMedicosDto(medicos);
};

export const getMedicoById = async (id) => {
    const medico = await medicosData.getMedicoById(id);
    return toMedicoDto(medico);
};

export const createMedico = async (medicoData) => {
    // Encriptamos la contraseña con SHA-256 antes de mandarla a la base de datos
    const contraseniaHash = crypto.createHash('sha256').update(medicoData.contrasenia).digest('hex');
    const dataConHash = { ...medicoData, contrasenia: contraseniaHash };
    
    return await medicosData.createMedico(dataConHash);
};

export const updateMedico = async (id, medicoData) => {
    const contraseniaHash = crypto.createHash('sha256').update(medicoData.contrasenia).digest('hex');
    const dataConHash = { ...medicoData, contrasenia: contraseniaHash };
    
    return await medicosData.updateMedico(id, dataConHash);
};

export const deleteMedico = async (id) => {
    return await medicosData.deleteMedico(id);
};