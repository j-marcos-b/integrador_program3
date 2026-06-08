export const toEspecialidadDto = (especialidad) => {
    if (!especialidad) return null;
    
    return {
        id: especialidad.id_especialidad,
        nombre: especialidad.nombre
    };
};

export const toEspecialidadesDto = (especialidades) => especialidades.map(toEspecialidadDto);