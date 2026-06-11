import db from '../config/db.js';

export const getAllTurnos = async (limit = 10, offset = 0) => {
    const [rows] = await db.query(
        'SELECT * FROM turnos_reservas WHERE activo = 1 LIMIT ? OFFSET ?',
        [Number(limit), Number(offset)]
    );
    return rows;
};

export const getEstadisticas = async () => {
    const [rows] = await db.query('CALL sp_estadisticas_atenciones()');
    return rows[0]; 
};

export const getDatosReportePDF = async () => {
    const query = `
        SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total,
               u_pac.nombres AS paciente_nombres, u_pac.apellido AS paciente_apellido,
               os.nombre AS obra_social,
               u_med.apellido AS medico_apellido
        FROM turnos_reservas tr
        JOIN pacientes p ON tr.id_paciente = p.id_paciente
        JOIN usuarios u_pac ON p.id_usuario = u_pac.id_usuario
        JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
        JOIN medicos m ON tr.id_medico = m.id_medico
        JOIN usuarios u_med ON m.id_usuario = u_med.id_usuario
        WHERE tr.activo = 1
    `;
    const [rows] = await db.query(query);
    return rows;
};

export const getTurnoById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM turnos_reservas WHERE id_turno_reserva = ? AND activo = 1',
        [id]
    );
    return rows[0];
};

export const getTurnosByPacienteUsuario = async (id_usuario) => {
    const [rows] = await db.query(
        `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
                m.id_medico, u.nombres AS medico_nombres, u.apellido AS medico_apellido, e.nombre AS especialidad
         FROM turnos_reservas tr
         JOIN pacientes p ON tr.id_paciente = p.id_paciente
         JOIN medicos m ON tr.id_medico = m.id_medico
         JOIN usuarios u ON m.id_usuario = u.id_usuario
         JOIN especialidades e ON m.id_especialidad = e.id_especialidad
         WHERE p.id_usuario = ? AND tr.activo = 1`,
        [id_usuario]
    );
    return rows;
};

export const getTurnosByMedicoUsuario = async (id_usuario) => {
    const [rows] = await db.query(
        `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
                p.id_paciente, u.nombres AS paciente_nombres, u.apellido AS paciente_apellido, os.nombre AS obra_social
         FROM turnos_reservas tr
         JOIN medicos m ON tr.id_medico = m.id_medico
         JOIN pacientes p ON tr.id_paciente = p.id_paciente
         JOIN usuarios u ON p.id_usuario = u.id_usuario
         JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
         WHERE m.id_usuario = ? AND tr.activo = 1`,
        [id_usuario]
    );
    return rows;
};

export const getDatosParaCalculo = async (id_medico, id_obra_social) => {
    const [medicoRows] = await db.query('SELECT valor_consulta FROM medicos WHERE id_medico = ?', [id_medico]);
    const [obraRows] = await db.query('SELECT porcentaje_descuento, es_particular FROM obras_sociales WHERE id_obra_social = ?', [id_obra_social]);
    return { medico: medicoRows[0], obraSocial: obraRows[0] };
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

export const marcarAtendido = async (id) => {
    const [result] = await db.query(
        'UPDATE turnos_reservas SET atentido = 1 WHERE id_turno_reserva = ?',
        [id]
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