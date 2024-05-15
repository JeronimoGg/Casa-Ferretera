const AuxMercadeo =  require('../models/AuxMercadeo');
const Promotor = require('../models/Promotor');
const Proveedor = require('../models/Proveedor');
const Supervisor = require('../models/Supervisor');
const Empresa = require('../models/Empresa');
const Sede = require('../models/Sede');
const { Sequelize } = require('sequelize');

const getPromotores = async (req, res) => {
    const promotores = await Promotor.findAll({
        attributes: ['id_promotor', 'correo', 'nombre', 'calificacion']
    });
    res.status(200).json(promotores);
}

const getPromotoresByProveedor = async (req, res) => {
    const correo = req.correo;
    const proveedor = await Proveedor.findOne({ where: { correo: correo } });
    const promotores = await Promotor.findAll({
        where: { id_proveedor: proveedor.id_proveedor },
        attributes: ['nombre']
    });
    if(!promotores){
        return res.status(400).json({ error: 'No tiene promotores asignados' });
    }
    res.status(200).json(promotores);
}

const getPromotor = async (req, res) => {
    const { id } = req.params;
    const promotor = await Promotor.findByPk(id, {
        attributes: ['id_promotor', 'correo', 'nombre', 'calificacion']
    });
    if(!promotor) {
        return res.status(400).json({ error: 'No se encontro el promotor' });
    }
    res.status(200).json(promotor);
}

const getProveedores = async (req, res) => {
    const proveedores = await Proveedor.findAll({
        attributes: ['id_proveedor', 'correo', 'nombre', 'id_empresa'],
    });

    const proveedoresConNombreEmpresa = await Promise.all(proveedores.map(async proveedor => {
        const nombreEmpresa = await Empresa.findOne({
            where: { id_empresa: proveedor.id_empresa },
            attributes: ['nombre']
        });
        return {
            id_proveedor: proveedor.id_proveedor,
            correo: proveedor.correo,
            nombre: proveedor.nombre,
            empresa: nombreEmpresa ? nombreEmpresa.nombre : null
        };
    }));

    res.status(200).json(proveedoresConNombreEmpresa);
}

const getProveedor = async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id, {
        attributes: ['id_proveedor', 'correo', 'nombre', 'id_empresa']
    });
    if(!proveedor) {
        return res.status(400).json({ error: 'No se encontro el proveedor' });
    }
    const nombreEmpresa = await Empresa.findOne({
        where: { id_empresa: proveedor.id_empresa },
        attributes: ['nombre']
    });
    const proveedorActualizado = {
        id_proveedor: proveedor.id_proveedor,
        correo: proveedor.correo,
        nombre: proveedor.nombre,
        empresa: nombreEmpresa.nombre 
    }
    res.status(200).json(proveedorActualizado);
}

const getSupervisores = async (req, res) => {
    const supervisores = await Supervisor.findAll({
        attributes: ['id_supervisor', 'correo', 'nombre', 'id_sede'],
    });

    const supervisoresConNombreSede = await Promise.all(supervisores.map(async supervisor => {
        const nombreSede = await Sede.findOne({
            where: { id_sede: supervisor.id_sede },
            attributes: ['nombre']
        });
        return {
            id_supervisor: supervisor.id_supervisor,
            correo: supervisor.correo,
            nombre: supervisor.nombre,
            sede: nombreSede ? nombreSede.nombre : null
        };
    }));

    res.status(200).json(supervisoresConNombreSede);
}

const getSupervisor = async (req, res) => {
    const { id } = req.params;
    const supervisor = await Supervisor.findByPk(id, {
        attributes: ['id_supervisor', 'correo', 'nombre', 'id_sede']
    });
    if(!supervisor) {
        return res.status(400).json({ error: 'No se encontro el supervisor' });
    }
    const nombreSede = await Sede.findOne({
        where: { id_sede: supervisor.id_supervisor },
        attributes: ['nombre']
    });
    if(!nombreSede) {
        return res.status(400).json({ error: 'Esa sede no existe' });
    }
    const supervisorActualizado = {
        id_supervisor: supervisor.id_supervisor,
        correo: supervisor.correo,
        nombre: supervisor.nombre,
        empresa: nombreSede.nombre 
    }
    res.status(200).json(supervisorActualizado);
}

const deletePromotor = async (req, res) => {
    try {
        const { id } = req.params;

        const promotor = await Promotor.findByPk(id);
        if(!promotor) {
            return res.status(400).json({ message: 'No se encontro el promotor' });
        }

        await promotor.destroy({
            force: true
        });

        res.status(200).json(promotor);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedor = await Proveedor.findByPk(id);
        if(!proveedor) {
            return res.status(400).json({ message: 'No se encontro el proveedor' });
        }

        await proveedor.destroy({
            force: true
        });

        res.status(200).json(proveedor);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteSupervisor = async (req, res) => {
    try {
        const { id } = req.params;

        const supervisor = await Supervisor.findByPk(id);
        if(!supervisor) {
            return res.status(400).json({ message: 'No se encontro el supervisor' });
        }

        await supervisor.destroy({
            force: true
        });

        res.status(200).json(supervisor);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updatePromotor = async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, nombre, calificacion } = req.body;
        const promotor = await Promotor.update(
            { correo, nombre, calificacion },
            { 
                where: { id_promotor: id } 
            }
        );

        if(!promotor) {
            return res.status(400).json({ message: 'No se encontro el promotor' });
        }

        return res.status(200).json({ message: 'actualizado correctamente' })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, nombre, nombreEmpresa } = req.body;
        const empresa = await Empresa.findOne( { where: { nombre: nombreEmpresa }});
        if(!empresa){
            return res.status(400).json({ message: 'No se encontro la empresa' });
        }
        const proveedor = await Proveedor.update(
            { correo, nombre, id_empresa: empresa.id_empresa },
            {
                where: { id_proveedor: id }
            }
        );

        if(!proveedor) {
            return res.status(400).json({ message: 'No se encontro el proveedor' });
        }

        return res.status(200).json({ message: 'actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const updateSupervisor = async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, nombre, nombreSede } = req.body;
        const sede = await Sede.findOne( { where: { nombre: nombreSede }});
        const supervisor = await Supervisor.update(
            { correo, nombre, id_sede: sede.id_sede },
            {
                where: { id_supervisor: id }
            }
        );
        if(!supervisor){
            return res.status(400).json({ message: 'No se encontro el supervisor' });
        }
        return res.status(200).json({ message: 'actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
module.exports = {
    getPromotores,
    getPromotoresByProveedor,
    getPromotor,
    getProveedores,
    getProveedor,
    getSupervisores,
    getSupervisor,
    deletePromotor,
    deleteProveedor,
    deleteSupervisor,   
    updatePromotor,
    updateProveedor,
    updateSupervisor,
}