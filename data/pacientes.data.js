import db from '../config/db.js';

export const getAllPacientes = async (limit = 10, offset = 0) => {
    const [rows] = await db.query(
        'SELECT * FROM v_pacientes LIMIT ? OFFSET ?', 
        [Number(limit), Number(offset)]
    );
    return rows;
};

export const getPacienteById = async (id) => {
    const [rows] = await db.query('SELECT * FROM v_pacientes WHERE id_paciente = ?', [id]);
    return rows[0]; 
};

export const createPaciente = async (id_usuario, id_obra_social) => {
    const [result] = await db.query(
        'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
        [id_usuario, id_obra_social]
    );
    return result.insertId;
};

export const updatePaciente = async (id, id_usuario, id_obra_social) => {
    const [result] = await db.query(
        'UPDATE pacientes SET id_usuario = ?, id_obra_social = ? WHERE id_paciente = ?',
        [id_usuario, id_obra_social, id]
    );
    return result.affectedRows > 0;
};

export const deletePaciente = async (id) => {
    const [result] = await db.query('DELETE FROM pacientes WHERE id_paciente = ?', [id]);
    return result.affectedRows > 0;
};
