import db from '../config/db.js';

export const getAllMedicos = async (limit = 10, offset = 0) => {
    const query = `
        SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta, 
               u.id_usuario, u.nombres, u.apellido, u.email, u.foto_path,
               e.id_especialidad, e.nombre AS especialidad_nombre
        FROM medicos m
        INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
        INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
        WHERE u.activo = 1
        LIMIT ? OFFSET ?
    `;
    const [rows] = await db.query(query, [Number(limit), Number(offset)]);
    return rows;
};

export const getMedicoById = async (id) => {
    const query = `
        SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta, 
               u.id_usuario, u.nombres, u.apellido, u.email, u.foto_path,
               e.id_especialidad, e.nombre AS especialidad_nombre
        FROM medicos m
        INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
        INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
        WHERE m.id_medico = ? AND u.activo = 1
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
};

export const createMedico = async (medicoData) => {
    const { documento, apellido, nombres, email, contrasenia, foto_path = '', id_especialidad, matricula, descripcion, valor_consulta } = medicoData;
    
    await db.beginTransaction();
    try {
        // Insertar en usuarios con rol = 1 (Médico)
        const [userResult] = await db.query(
            'INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo) VALUES (?, ?, ?, ?, ?, ?, 1, 1)',
            [documento, apellido, nombres, email, contrasenia, foto_path]
        );
        const id_usuario = userResult.insertId;

        // Insertar en medicos
        const [medicoResult] = await db.query(
            'INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]
        );

        await db.commit();
        return medicoResult.insertId;
    } catch (error) {
        await db.rollback();
        throw error;
    }
};

export const updateMedico = async (id, medicoData) => {
    const { documento, apellido, nombres, email, contrasenia, foto_path = '', id_especialidad, matricula, descripcion, valor_consulta } = medicoData;
    
    await db.beginTransaction();
    try {
        const [rows] = await db.query('SELECT id_usuario FROM medicos WHERE id_medico = ?', [id]);
        if (rows.length === 0) {
            await db.rollback();
            return false;
        }
        const id_usuario = rows[0].id_usuario;

        await db.query(
            'UPDATE usuarios SET documento = ?, apellido = ?, nombres = ?, email = ?, contrasenia = ?, foto_path = ? WHERE id_usuario = ?',
            [documento, apellido, nombres, email, contrasenia, foto_path, id_usuario]
        );

        await db.query(
            'UPDATE medicos SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ? WHERE id_medico = ?',
            [id_especialidad, matricula, descripcion, valor_consulta, id]
        );

        await db.commit();
        return true;
    } catch (error) {
        await db.rollback();
        throw error;
    }
};

export const deleteMedico = async (id) => {
    const [rows] = await db.query('SELECT id_usuario FROM medicos WHERE id_medico = ?', [id]);
    if (rows.length === 0) return false;
    
    const id_usuario = rows[0].id_usuario;
    
    const [result] = await db.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id_usuario]);
    return result.affectedRows > 0;
};
