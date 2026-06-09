import * as vinculacionData from '../data/medicos_obras_sociales.data.js';
import { toMedicosObrasSocialesDto } from '../dtos/medico_obra_social.dto.js';

export const getObrasSocialesByMedico = async (idMedico) => {
    const rows = await vinculacionData.getObrasSocialesByMedico(idMedico);
    return toMedicosObrasSocialesDto(rows);
};

export const assignObraSocialToMedico = async (idMedico, idObraSocial) => {
    return await vinculacionData.assignObraSocialToMedico(idMedico, idObraSocial);
};

export const removeObraSocialFromMedico = async (idMedico, idObraSocial) => {
    return await vinculacionData.removeObraSocialFromMedico(idMedico, idObraSocial);
};