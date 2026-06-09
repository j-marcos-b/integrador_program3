import db from '../config/db.js';

export const getAllObrasSociales = async (limit, offset) => {
    const [rows] = await db.query(
        'SELECT * FROM obras_sociales WHERE activo = 1 LIMIT ? OFFSET ?',
        [limit, offset]
    );
    return rows;
};

export const getObraSocialById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1',
        [id]
    );
    return rows[0];
};

export const createObraSocial = async (obraData) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular = 0 } = obraData;
    const [result] = await db.query(
        'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular, activo) VALUES (?, ?, ?, ?, 1)',
        [nombre, descripcion, porcentaje_descuento, es_particular]
    );
    return result.insertId;
};

export const updateObraSocial = async (id, obraData) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular = 0 } = obraData;
    const [result] = await db.query(
        'UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ?',
        [nombre, descripcion, porcentaje_descuento, es_particular, id]
    );
    return result.affectedRows > 0;
};

export const deleteObraSocial = async (id) => {
    const [result] = await db.query(
        'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?',
        [id]
    );
    return result.affectedRows > 0;
};