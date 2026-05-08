/**
 * Transforma un objeto paciente de la base de datos al formato de la API (DTO).
 * @param {object} paciente - El objeto paciente de la base de datos.
 * @returns {object|null} El objeto paciente en formato DTO o null si la entrada es nula.
 */
export const toPacienteDto = (paciente) => {
    if (!paciente) return null;
    return {
        id: paciente.id_paciente,
        usuarioId: paciente.id_usuario,
        obraSocialId: paciente.id_obra_social,
    };
};

export const toPacientesDto = (pacientes) => pacientes.map(toPacienteDto);