const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const AuxMercadeo =  require('../models/AuxMercadeo');
const Promotor = require('../models/Promotor');
const Proveedor = require('../models/Proveedor');
const Supervisor = require('../models/Supervisor');

const generateAuthToken = (usuario) => {
    const token = jwt.sign({ correo: usuario.correo }, secret, { 
        expiresIn: 86400
    });
    return token;
}

const buscarUsuarioPorCorreo = async (correo) => {
    let usuario = await AuxMercadeo.findOne({ where: { correo: correo } });
    let tipoUsuario = 'AuxMercadeo';
    if (!usuario) {
      usuario = await Proveedor.findOne({ where: { correo: correo } });
      tipoUsuario = 'Proveedor';
    }
    if (!usuario) {
      usuario = await Promotor.findOne({ where: { correo: correo } });
      tipoUsuario = 'Promotor';
    }
    if (!usuario) {
      usuario = await Supervisor.findOne({ where: { correo: correo } });
      tipoUsuario = 'Supervisor';
    }
    if(usuario) {
        usuario.tipo = tipoUsuario;
    }

    return usuario;
  };

module.exports = {
    generateAuthToken,
    buscarUsuarioPorCorreo
}