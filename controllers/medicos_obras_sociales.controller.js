import { validationResult } from 'express-validator';
import * as vinculacionService from '../services/medicos_obras_sociales.service.js';

export const getObrasSocialesByMedico = async (req, res) => {
    const { idMedico } = req.params;
    try {
        const obrasSociales = await vinculacionService.getObrasSocialesByMedico(idMedico);
        res.json(obrasSociales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las obras sociales del médico' });
    }
};

export const assignObraSocial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id_medico, id_obra_social } = req.body;
    try {
        await vinculacionService.assignObraSocialToMedico(id_medico, id_obra_social);
        res.status(201).json({ message: 'Obra social asignada al médico exitosamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'El médico ya tiene asignada esta obra social' });
        }
        console.error(error);
        res.status(500).json({ message: 'Error al asignar la obra social' });
    }
};

export const removeObraSocial = async (req, res) => {
    const { idMedico, idObraSocial } = req.params;
    try {
        const removido = await vinculacionService.removeObraSocialFromMedico(idMedico, idObraSocial);
        if (removido) res.status(200).json({ message: 'Obra social removida del médico' });
        else res.status(404).json({ message: 'Relación no encontrada' });
    } catch (error) { console.error(error); res.status(500).json({ message: 'Error al remover la obra social' }); }
};