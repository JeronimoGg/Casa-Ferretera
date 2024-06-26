const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { buscarUsuarioPorCorreo } = require('../utils/auth.utils')

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if(!bearerHeader) return res.status(403).json({error: "no token provided"});
    const token = bearerHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        req.correo = decoded.correo;
        next();
      } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
      }
}

const isAuxMercadeo = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'AuxMercadeo') {
        next();
    } else {
        return res.status(401).json({
            error: {
                message: `Esta pagina solo la pueden ver Auxiliares de mercadeo y tu rol es ${usuario.tipo}`,
                rol: usuario.tipo
            }
        });
    }
}

const isProveedor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'Proveedor') {
        next();
    } else {
        return res.status(401).json({
            error: {
                message: `Esta pagina solo la pueden ver Proveedores y tu rol es ${usuario.tipo}`,
                rol: usuario.tipo
        }
    });
    }
}

const isSupervisor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'Supervisor') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: `Esta pagina solo la pueden ver Supervisores y tu rol es ${usuario.tipo}`,
                rol: usuario.tipo
        }
    });
    }
}

const isPromotor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'Promotor') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: `Esta pagina solo la pueden ver Promotores y tu rol es ${usuario.tipo}`,
                rol: usuario.tipo
        }
    });
    }
}

const isAuxOrProveedor = async (req, res, next) => {
    const correo = req.correo;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if(usuario.tipo === 'AuxMercadeo' || usuario.tipo === 'Proveedor') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: `Esta pagina solo la pueden ver Auxiliars de mercadeo o proveedores y tu rol es ${usuario.tipo}`,
                rol: usuario.tipo
        }
    });
    }
}



module.exports = {
    verifyToken,
    isAuxMercadeo,
    isProveedor,
    isSupervisor,
    isPromotor,
    isAuxOrProveedor
}