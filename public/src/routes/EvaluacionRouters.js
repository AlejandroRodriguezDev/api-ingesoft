
const express = require('express');
const EvaluacionController = require('../controllers/EvaluacionController');
const router = express.Router();

router.post('/guardarEvaluacion_y_Resultados', EvaluacionController.guardarResultadosYHistorial);

module.exports = router;
