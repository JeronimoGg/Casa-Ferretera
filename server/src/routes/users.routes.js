const { Router } = require('express');
const { verifyToken, isAuxMercadeo, isProveedor, isSupervisor } = require('../middleware/authJWT');
const userController = require('../controller/users.controller')

const router = new Router();


/**
 * retorna todos los promotores
 * 
 * @route GET /promotor
 * @access Private (requires token)
 * @returns { Array } - Un array con los objetos de promotores
 */
router.get('/promotor', verifyToken, isAuxMercadeo, userController.getPromotores);
/**
 * retorna un promotor
 * 
 * @route GET /promotor/:id
 * @access Private (requires token)
 * @param { number } id - El id del promotor
 * @returns { Object } - retorna el objeto del promotor, sino lo encuentra retorna un mensaje de error
 */
router.get('/proveedor/promotores', verifyToken, isProveedor, userController.getPromotoresByProveedor)
router.get('/promotor/:id', verifyToken, isAuxMercadeo, userController.getPromotor);
router.get('/promotores', verifyToken, isProveedor , userController.getNamePromotoresByProveedor)
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
router.delete('/supervisor/:id', verifyToken, isAuxMercadeo, userController.deleteSupervisor);

router.get('/promotores-sede', verifyToken, isSupervisor, userController.getPromotoresBySede);

module.exports = router;