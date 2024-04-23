const { Router } = require('express');
const { verifyToken, isProveedor } = require('../middleware/authJWT');
const { agendarPromotoria } = require('../controller/promotorias.controller');

const router = new Router();

router.get('/');
router.post('/agendar', verifyToken, isProveedor, agendarPromotoria);
router.put('/subirFots');






module.exports = router;