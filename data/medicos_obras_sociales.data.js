import db from '../config/db.js';

export const getObrasSocialesByMedico = async (idMedico) => {
    const [rows] = await db.query(
        'SELECT * FROM medicos_obras_sociales WHERE id_medico = ?',
        [idMedico]
    );
    return rows;
};

export const assignObraSocialToMedico = async (idMedico, idObraSocial) => {
    const [result] = await db.query(
        'INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)',
        [idMedico, idObraSocial]
    );
    return result.affectedRows > 0;
};

export const removeObraSocialFromMedico = async (idMedico, idObraSocial) => {
    const [result] = await db.query(
        'DELETE FROM medicos_obras_sociales WHERE id_medico = ? AND id_obra_social = ?',
        [idMedico, idObraSocial]
    );
    return result.affectedRows > 0;
};