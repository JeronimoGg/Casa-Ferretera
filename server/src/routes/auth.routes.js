const { Router } = require('express');
const  { signUpAux, signUpProveedor, signUpPromotorByProveedor, signupSupervisorByAuxMercadeo, signIn, getInfoUsuario } = require('../controller/auth.controller');
const { verifyToken, isAuxMercadeo, isProveedor } = require('../middleware/authJWT');

const router = new Router();

//rutas registro diferentes perfiles
router.post('/signupAux', signUpAux);
router.post('/signupPromotor', verifyToken, isProveedor, signUpPromotorByProveedor);
router.post('/signupProveedor', signUpProveedor);
router.post('/signupSupervisor', verifyToken, isAuxMercadeo, signupSupervisorByAuxMercadeo);

//rutas login diferentes perfiles
router.post('/signin', signIn);
router.get('/test', verifyToken, isProveedor, (req, res) => {
    res.status(200).json({message: "token valido"})
});

router.get('/info', verifyToken, getInfoUsuario);


module.exports = router;