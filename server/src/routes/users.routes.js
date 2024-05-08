const { Router } = require('express');
const { verifyToken, isAuxMercadeo } = require('../middleware/authJWT');
const userController = require('../controller/users.controller')

const router = new Router();

//Crud para el rol de promotor
router.get('/promotor', verifyToken, isAuxMercadeo, userController.getPromotores);
router.get('/promotor/:id', verifyToken, isAuxMercadeo, userController.getPromotor);
router.delete('/promotor/:id', verifyToken, isAuxMercadeo, userController.deletePromotor);
router.put('/promotor/:id', verifyToken, isAuxMercadeo, userController.updatePromotor);

//Crud para el rol de proveedor
router.get('/proveedor', verifyToken, isAuxMercadeo, userController.getProveedores);
router.get('/proveedor/:id', verifyToken, isAuxMercadeo, userController.getProveedor);
router.put('/proveedor/:id', verifyToken, isAuxMercadeo, userController.updateProveedor);
router.delete('/proveedor/:id', verifyToken, isAuxMercadeo, userController.deleteProveedor);

//Crud para el rol de supevisor
router.get('/supervisor', verifyToken, isAuxMercadeo, userController.getSupervisores);
router.get('/supervisor/:id', verifyToken, isAuxMercadeo, userController.getSupervisor);
router.put('/supervisor/:id', verifyToken, isAuxMercadeo, userController.updateSupervisor);
router.delete('/supervisor/:id', verifyToken, isAuxMercadeo, userController.deleteSupervisor)

module.exports = router;