const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { buscarUsuarioPorCorreo } = require('../utils/auth.utils')

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if(!bearerHeader) return res.status(403).json({message: "no token provided"});
    const token = bearerHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        req.correo = decoded.correo;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }
}

const isAuxMercadeo = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'AuxMercadeo') {
        next();
    } else {
        return res.status(403).json({message: "No tienes permisos para realizar esta acción"});
    }
}

const isProveedor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'Proveedor') {
        next();
    } else {
        return res.status(403).json({message: "No tienes permisos para realizar esta acción"});
    }
}

const isSupervisor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    console.log(usuario);
    if(usuario.tipo === 'Supervisor') {
        next();
    } else {
        return res.status(403).json({message: "No tienes permisos para realizar esta acción"});
    }
}



module.exports = {
    verifyToken,
    isAuxMercadeo,
    isProveedor,
    isSupervisor
}