export const toTurnoDto = (turno) => {
    if (!turno) return null;
    
    return {
        id: turno.id_turno_reserva,
        medicoId: turno.id_medico,
        pacienteId: turno.id_paciente,
        obraSocialId: turno.id_obra_social,
        fechaHora: turno.fecha_hora,
        valorTotal: Number(turno.valor_total),
        atendido: Boolean(turno.atentido), // Corregimos el typo de la DB para la API
        activo: Boolean(turno.activo)
    };
};

export const toTurnosDto = (turnos) => turnos.map(toTurnoDto);