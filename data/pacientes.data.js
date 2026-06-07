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

export const createPaciente = async (pacienteData) => {
    const { documento, apellido, nombres, email, contrasenia, foto_path = '', id_obra_social } = pacienteData;
    
    await db.beginTransaction();
    try {
        const [userResult] = await db.query(
            'INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo) VALUES (?, ?, ?, ?, ?, ?, 2, 1)',
            [documento, apellido, nombres, email, contrasenia, foto_path]
        );
        const id_usuario = userResult.insertId;

        const [pacienteResult] = await db.query(
            'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
            [id_usuario, id_obra_social]
        );

        await db.commit();
        return pacienteResult.insertId;
    } catch (error) {
        await db.rollback();
        throw error;
    }
};

export const updatePaciente = async (id, pacienteData) => {
    const { documento, apellido, nombres, email, contrasenia, foto_path = '', id_obra_social } = pacienteData;
    
    await db.beginTransaction();
    try {
        const [rows] = await db.query('SELECT id_usuario FROM pacientes WHERE id_paciente = ?', [id]);
        if (rows.length === 0) {
            await db.rollback();
            return false;
        }
        const id_usuario = rows[0].id_usuario;

        await db.query(
            'UPDATE usuarios SET documento = ?, apellido = ?, nombres = ?, email = ?, contrasenia = ?, foto_path = ? WHERE id_usuario = ?',
            [documento, apellido, nombres, email, contrasenia, foto_path, id_usuario]
        );

        const [result] = await db.query(
            'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?',
            [id_obra_social, id]
        );

        await db.commit();
        return true;
    } catch (error) {
        await db.rollback();
        throw error;
    }
};

export const deletePaciente = async (id) => {
    const [rows] = await db.query('SELECT id_usuario FROM pacientes WHERE id_paciente = ?', [id]);
    if (rows.length === 0) return false;
    
    const id_usuario = rows[0].id_usuario;
    
    const [result] = await db.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id_usuario]);
    return result.affectedRows > 0;
};
