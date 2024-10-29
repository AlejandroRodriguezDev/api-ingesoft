const db = require('../../../db');

const EstudianteController = {
    getInteligencias: (req, res) => {
        const studentId = req.params.id;
        const query = `
            SELECT i.nombre, ei.porcentaje 
            FROM estudiantes_inteligencias ei
            JOIN inteligencias i ON ei.id_inteligencia = i.id_inteligencia
            WHERE ei.id_estudiante = ?
        `;
        db.query(query, [studentId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    },
    getEvaluaciones: (req, res) => {
        const studentId = req.params.id;
        const query = `
            SELECT e.id_evaluacion, e.fecha_evalu, re.id_inteligencia, re.porcentaje 
            FROM evaluaciones e
            JOIN resultados_evaluaciones re ON e.id_evaluacion = re.id_evaluacion
            WHERE re.id_estudiante = ?
        `;
        db.query(query, [studentId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    }
};

module.exports = EstudianteController;
