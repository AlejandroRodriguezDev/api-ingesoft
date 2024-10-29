const express = require('express');
const ProfesorController = require('../controllers/ProfesorController');
const router = express.Router();

router.get('/curso/:cursoId/estudiantes', ProfesorController.getEstudiantesPorCurso);
router.post('/curso/:cursoId/estudiantes', ProfesorController.addEstudiante);

module.exports = router;
