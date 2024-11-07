const db = require('../../../db');

const ProfesorController = {
    getEstudiantesPorCurso: (req, res) => {
        const cursoId = req.params.cursoId;
        const query = `SELECT u.id, u.username, u.nombre, u.apellido  
                       FROM estudiantes e
                       JOIN usuarios u ON e.id_usuario = u.id
                       WHERE e.id_curso = ?`;
        db.query(query, [cursoId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    },

    addEstudiante: (req, res) => {
        const { id_usuario, edad, genero, id_curso } = req.body;
        const query = "INSERT INTO estudiantes SET ?";
        db.query(query, { id_usuario, edad, genero, id_curso }, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Estudiante añadido exitosamente" });
        });
    },

    crearCurso: (req, res) => {
        const { profesorId, nombre_curso } = req.body;
        const queryCurso = "INSERT INTO cursos (nombre_curso) VALUES (?)";
        db.query(queryCurso, [nombre_curso], (err, cursoResult) => {
            if (err) return res.status(500).json({ error: "Error al crear el curso" });
            const nuevoCursoId = cursoResult.insertId;
            const queryActualizarProfesor = "UPDATE profesores SET id_curso = ? WHERE id_usuario = ?";
            db.query(queryActualizarProfesor, [nuevoCursoId, profesorId], (err) => {
                if (err) return res.status(500).json({ error: "Error al asignar el curso al profesor" });
                res.status(201).json({ 
                    message: "Curso creado y asignado exitosamente",
                    cursoId: nuevoCursoId,
                    nombre_curso: nombre_curso 
                });
            });
        });
    }
};

module.exports = ProfesorController;
