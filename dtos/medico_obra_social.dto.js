export const toMedicoObraSocialDto = (row) => ({
    medicoId: row.id_medico,
    obraSocialId: row.id_obra_social
});

export const toMedicosObrasSocialesDto = (rows) => rows.map(toMedicoObraSocialDto);