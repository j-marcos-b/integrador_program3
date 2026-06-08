export const toMedicoDto = (medico) => {
    if (!medico) return null;
    return {
        id: medico.id_medico,
        usuarioId: medico.id_usuario,
        nombres: medico.nombres,
        apellido: medico.apellido,
        email: medico.email,
        matricula: medico.matricula,
        descripcion: medico.descripcion,
        valorConsulta: Number(medico.valor_consulta),
        especialidad: {
            id: medico.id_especialidad,
            nombre: medico.especialidad_nombre
        },
        foto: medico.foto_path
    };
};

export const toMedicosDto = (medicos) => medicos.map(toMedicoDto);
