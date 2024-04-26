const { Router } = require('express');
const { verifyToken, isAuxMercadeo } = require('../middleware/authJWT');
const userController = require('../controller/users.controller')

const router = new Router();

//Crud para el rol de promotor
router.get('/promotor', verifyToken, isAuxMercadeo, userController.getPromotor);
router.delete('/promotor/:id', verifyToken, isAuxMercadeo, userController.deletePromotor);

//Crud para el rol de proveedor
router.get('/proveedor', verifyToken, isAuxMercadeo, userController.getProveedor);
router.delete('/proveedor/:id', verifyToken, isAuxMercadeo, userController.deleteProveedor);

//Crud para el rol de supevisor
router.get('/supervisor', verifyToken, isAuxMercadeo, userController.getSupervisor);
router.delete('/supervisor/:id', verifyToken, isAuxMercadeo, userController.deleteSupervisor)

module.exports = router;