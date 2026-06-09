import db from '../config/db.js';

export const getAllEspecialidades = async (limit = 10, offset = 0) => {
    const [rows] = await db.query(
        'SELECT * FROM especialidades WHERE activo = 1 LIMIT ? OFFSET ?',
        [Number(limit), Number(offset)]
    );
    return rows;
};

export const getEspecialidadById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
        [id]
    );
    return rows[0];
};

export const createEspecialidad = async (especialidadData) => {
    const { nombre } = especialidadData;
    const [result] = await db.query(
        'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)',
        [nombre]
    );
    return result.insertId;
};

export const updateEspecialidad = async (id, especialidadData) => {
    const { nombre } = especialidadData;
    const [result] = await db.query(
        'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?',
        [nombre, id]
    );
    return result.affectedRows > 0;
};

export const deleteEspecialidad = async (id) => {
    const [result] = await db.query(
        'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?',
        [id]
    );
    return result.affectedRows > 0;
};