const { Router } = require('express');
const { verifyToken, isProveedor, isAuxMercadeo, isSupervisor } = require('../middleware/authJWT');
const promotoriaController = require('../controller/promotorias.controller');

const router = new Router();

//Rutas para el rol de proveedor
router.get('/cancelar', verifyToken, isProveedor, promotoriaController.promotoriasActivasProveedor);
router.put('/cancelar/:id', verifyToken, isProveedor, promotoriaController.cancelarPromotoria);
router.post('/agendar', verifyToken, isProveedor, promotoriaController.agendarPromotoriaProveedor);

//Rutas para el rol de Auxiliar de mercadeo
router.get('/', verifyToken, isAuxMercadeo, promotoriaController.promotoriasActivasAuxmercadeo);

//Rutas para el rol de supervisor
router.get('/rechazar', verifyToken, isSupervisor, promotoriaController.promotoriasPendientes);
router.put('/rechazar/:id', verifyToken, isSupervisor, promotoriaController.cancelarPromotoria);



router.put('/subirFots');






module.exports = router;