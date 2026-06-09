import db from '../config/db.js';

export const getAllTurnos = async (limit = 10, offset = 0) => {
    const [rows] = await db.query(
        'SELECT * FROM turnos_reservas WHERE activo = 1 LIMIT ? OFFSET ?',
        [Number(limit), Number(offset)]
    );
    return rows;
};

export const getTurnoById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM turnos_reservas WHERE id_turno_reserva = ? AND activo = 1',
        [id]
    );
    return rows[0];
};

export const createTurno = async (turnoData) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido = 0 } = turnoData;
    const [result] = await db.query(
        'INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo) VALUES (?, ?, ?, ?, ?, ?, 1)',
        [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido]
    );
    return result.insertId;
};

export const updateTurno = async (id, turnoData) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido } = turnoData;
    const [result] = await db.query(
        'UPDATE turnos_reservas SET id_medico = ?, id_paciente = ?, id_obra_social = ?, fecha_hora = ?, valor_total = ?, atentido = ? WHERE id_turno_reserva = ?',
        [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, id]
    );
    return result.affectedRows > 0;
};

export const deleteTurno = async (id) => {
    const [result] = await db.query(
        'UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?',
        [id]
    );
    return result.affectedRows > 0;
};