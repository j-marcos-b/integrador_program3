export const toObraSocialDto = (obraSocial) => {
    if (!obraSocial) return null;
    
    return {
        id: obraSocial.id_obra_social,
        nombre: obraSocial.nombre,
        descripcion: obraSocial.descripcion,
        porcentajeDescuento: Number(obraSocial.porcentaje_descuento),
        esParticular: Boolean(obraSocial.es_particular)
    };
};

export const toObrasSocialesDto = (obrasSociales) => obrasSociales.map(toObraSocialDto);