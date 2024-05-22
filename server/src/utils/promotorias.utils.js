const Calificacion = require('../models/Calificacion');

const calcularPromedioCalificacion = async (promotorId) =>{
    const calificaciones = await Calificacion.findAll({where: { id_promotor: promotorId}});
    const total = calificaciones.reduce((acumulado, calificacion) => acumulado + calificacion.calificacion, 0);
    const promedio = calificaciones.length ? Math.round(total / calificaciones.length) : 0;
    return promedio;
}

module.exports = {
    calcularPromedioCalificacion
}