import * as obrasSocialesData from '../data/obras_sociales.data.js';
import { toObraSocialDto, toObrasSocialesDto } from '../dtos/obra_social.dto.js';

export const getAllObrasSociales = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const obras = await obrasSocialesData.getAllObrasSociales(limit, offset);
    return toObrasSocialesDto(obras);
};

export const getObraSocialById = async (id) => {
    const obra = await obrasSocialesData.getObraSocialById(id);
    return toObraSocialDto(obra);
};

export const createObraSocial = async (obraData) => {
    return await obrasSocialesData.createObraSocial(obraData);
};

export const updateObraSocial = async (id, obraData) => {
    return await obrasSocialesData.updateObraSocial(id, obraData);
};

export const deleteObraSocial = async (id) => {
    return await obrasSocialesData.deleteObraSocial(id);
};