const express = require('express');
const EstudianteController = require('../controllers/EstudianteController');
const router = express.Router();

router.get('/:id/inteligencias', EstudianteController.getInteligencias);
router.get('/:id/evaluaciones', EstudianteController.getEvaluaciones);

module.exports = router;
