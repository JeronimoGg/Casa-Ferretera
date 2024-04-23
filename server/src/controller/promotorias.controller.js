const Promotoria = require('../models/Promotoria');
const Proveedor = require('../models/Proveedor');
const Promotor = require('../models/Promotor');
const { Op } = require("sequelize");
const Sede = require('../models/Sede');

const agendarPromotoria = async (req, res) => {
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
        descripcion: descripcion,
    });

    await newPromotoria.save();
    res.status(200).json(newPromotoria);

}



module.exports = {
    agendarPromotoria,
}