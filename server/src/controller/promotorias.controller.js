const Promotoria = require('../models/Promotoria');
const Proveedor = require('../models/Proveedor');
const Promotor = require('../models/Promotor');
const Estado = require('../models/Estado');
const { Op } = require("sequelize");
const Sede = require('../models/Sede');
const Supervisor = require('../models/Supervisor');

const agendarPromotoriaProveedor = async (req, res) => {
    const { nombrePromotor, nombreSede, fecha, horaInicio, horaFinal, descripcion } = req.body;

    /* let fechaFixed = new Date(fecha);
    fechaFixed.setUTCHours(0, 0, 0, 0); */

    const correo = req.correo;
    const promotor = await Promotor.findOne({ where: { nombre: nombrePromotor } });
    const sede = await Sede.findOne({ where: { nombre: nombreSede } });
    const proveedor = await Proveedor.findOne({ where: { correo: correo } });

    if(!sede) {
        return res.status(400).json({ message: 'La sede no existe' });
    }

    if(horaFinal < horaInicio) {
        return res.status(400).json({ message: 'La hora de finalización debe ser mayor a la hora de inicio' });
    }
    const promotoriaSolapada = await Promotoria.findAll({
        where: {
            fecha: fecha,
            id_sede: sede.id_sede,
            [Op.or]: [ 
                {
                    horaInicio: { [Op.between]: [horaInicio, horaFinal] }
                },
                {
                    horaFinal: { [Op.between]: [horaInicio, horaFinal] }
                }
            ]
            
        }
    })

    if(promotoriaSolapada.length > 0) {
        return res.status(400).json({ message: 'Ya existe una promotoría en ese horario' });
    }

    const newPromotoria = new Promotoria({
        id_promotor: promotor.id_proveedor,
        id_proveedor: proveedor.id_proveedor,
        id_sede: sede.id_sede,
        fecha: fecha,
        horaInicio: horaInicio,
        horaFinal: horaFinal,
        id_estado: 1,
    });

    await newPromotoria.save();
    res.status(200).json(newPromotoria);

}

const promotoriasActivasProveedor = async (req, res) => {
    const correo = req.correo;
    const proveedor = await Proveedor.findOne({ where: { correo: correo } });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFixed = tomorrow.toISOString().slice(0, 10);
    const promotorias = await Promotoria.findAll({
        where: { 
            fecha: { [Op.gte]: tomorrowFixed },
            id_proveedor: proveedor.id_proveedor,
            id_estado: 1
        }
    })


    res.status(200).json(promotorias);
    
}

const cancelarPromotoria = async (req, res) => {
    const { id } = req.params;
    try {
        const promotoria = await Promotoria.findByPk(id);
        const estadoCancelada = await Estado.findOne({ where: { nombre: 'cancelada' } });
        
        promotoria.id_estado = estadoCancelada.id_estado;

        await promotoria.save();

        if(!promotoria) {
            return res.status(400).json({ message: 'No se encontro la promotoria' });
        }
        
        return res.status(200).json({ message: 'La promotoria fue cancelada'});

    } catch (error) {
        console.error('Error al cancelar la promotoria:', error);
        res.status(500).json({ message: 'Hubo un error al cancelar la promotoria.' });
    }
}

const promotoriasActivasAuxmercadeo = async (req, res) => {
    const today = new Date().toISOString().slice(0, 10)
    const promotorias = await Promotoria.findAll({
        where: {
            fecha: today,
        }
    });

    res.status(200).json(promotorias);
}

const promotoriasPendientes = async (req, res) => {
    const correo = req.correo;
    const supervisor = await Supervisor.findOne({ where: { correo: correo}})

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFixed = tomorrow.toISOString().slice(0, 10);

    const promotorias = await Promotoria.findAll({
        where: {
            fecha: tomorrowFixed,
            id_sede: supervisor.id_sede,
            id_estado: 1
        }
    });

    res.status(200).json(promotorias);
}

module.exports = {
    agendarPromotoriaProveedor,
    promotoriasActivasProveedor,
    promotoriasActivasAuxmercadeo,
    cancelarPromotoria,
    promotoriasPendientes
}