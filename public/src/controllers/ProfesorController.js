const db = require('../../../db');

const ProfesorController = {
    getEstudiantesPorCurso: (req, res) => {
        const cursoId = req.params.cursoId;
        const query = `  //RETORTNA LAS INTELIGENCIAS DE UN ESTUDIANTE
            SELECT u.id, u.username, u.nombre, u.apellido  
            FROM estudiantes e
            JOIN usuarios u ON e.id_usuario = u.id
            WHERE e.id_curso = ?
        `;
        db.query(query, [cursoId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    },
        addEstudiante: (req, res) => {
            const { id_usuario, edad, genero, id_curso } = req.body; //ID USUARIO ES EL CODIGO DEL ESTUDIANTE
            const query = "INSERT INTO estudiantes SET ?";
            db.query(query, { id_usuario, edad, genero, id_curso }, (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "Estudiante añadido exitosamente" });
            });
        }
};

module.exports = ProfesorController;
