const Estado = require('../models/Estado');

async function insertarEstadosSiNoExisten() {
    try {
        // Verificar si existen estados en la tabla Estado
        const estados = await Estado.findAll();

        // Si no hay estados, insertar los estados
        if (estados.length === 0) {
            await Estado.bulkCreate([
                { nombre: 'programada' },
                { nombre: 'en progreso' },
                { nombre: 'terminada' },
                { nombre: 'cancelada' }
            ]);
            console.log('Estados insertados correctamente.');
        } else {
            console.log('Los estados ya están creados.');
        }
    } catch (error) {
        console.error('Error al insertar estados:', error);
    }
}

module.exports = { insertarEstadosSiNoExisten }