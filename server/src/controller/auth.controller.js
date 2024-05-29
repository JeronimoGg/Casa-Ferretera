const AuxMercadeo =  require('../models/AuxMercadeo');
const Promotor = require('../models/Promotor');
const Proveedor = require('../models/Proveedor');
const Supervisor = require('../models/Supervisor');
const Empresa = require('../models/Empresa');
const Sede = require('../models/Sede');
const bcrypt = require('bcryptjs');
const { generateAuthToken, buscarUsuarioPorCorreo } = require('../utils/auth.utils')
//import config from '../config';

const signUpAux = async (req, res) => {
    const { correo, contrasena, nombre } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUserAux = new AuxMercadeo({
        correo,
        contrasena: hashedPassword,
        nombre
    });
    console.log(newUserAux);
    await newUserAux.save();
    res.status(200).json(newUserAux);
}

const signUpProveedor = async (req, res) => {
    const { correo, contrasena, nombre, nombreEmpresa } = req.body;

    const [empresa, created] = await Empresa.findOrCreate({
        where: {
            nombre: nombreEmpresa
        },
        defaults: {
            nombre: nombreEmpresa
        }
    });

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUserProveedor = new Proveedor({
        correo,
        contrasena: hashedPassword,
        nombre,
        id_empresa: empresa.id_empresa
    });
    await newUserProveedor.save();
    res.status(200).json(newUserProveedor);

}

const signUpPromotorByProveedor = async (req, res) => {
    const { correo, nombre, contrasena, documentos } = req.body;
    const correoProveedor = req.correo;

    const proveedor = await buscarUsuarioPorCorreo(correoProveedor);
    const promotor = await Promotor.findAll({where: {correo: correo}});
    if(promotor.length > 0) {
        return res.status(400).json({ error: 'Ya existe un promotor con ese correo' });
    }
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    const newUserPromotor = new Promotor({
        id_proveedor: proveedor.id_proveedor,
        correo,
        nombre,
        contrasena: hashedPassword,
        calificacion: 3,
        documentos
    })
    await newUserPromotor.save();
    res.status(200).json({ message: 'Creado correctamente' });
}

const signupSupervisorByAuxMercadeo = async (req, res) => {
    const { nombreSede, correo, contrasena, nombre } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const sede = await Sede.findOne({ where: { nombre: nombreSede }});
    if(!sede) {
        return res.status(400).json({ message: 'La sede no existe' });
    }
    const newUserSupervisor = new Supervisor({
        id_sede: sede.id_sede,
        correo,
        contrasena: hashedPassword,
        nombre
    });
    await newUserSupervisor.save();
    res.status(200).json(newUserSupervisor);
}

const signIn = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        let usuario = await buscarUsuarioPorCorreo(correo);
        if(!usuario) {
            return res.status(401).json({message: 'usuario no encontrado'});
        }
        const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
        if(validPassword === false) {
            return res.status(401).json({message: 'contrasena incorrecta'});
        }
        const token = generateAuthToken(usuario);
        const rol = usuario.tipo
        res.status(200).json({ token, rol });
    } catch (err) {
        console.error(err);
    }
}

const getInfoUsuario = async (req, res) => {
    const correo = req.correo;
    let usuario = await buscarUsuarioPorCorreo(correo);
    if(!usuario) {
        return res.status(401).json({message: 'usuario no encontrado'});
    } 
    return res.status(200).json({message: usuario.tipo});
}


module.exports = { 
    signUpAux, 
    signUpProveedor, 
    signUpPromotorByProveedor,
    signupSupervisorByAuxMercadeo,
    signIn,
    getInfoUsuario
}