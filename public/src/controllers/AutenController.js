const db = require('../../../db');

const AutenController = {
    // Registro de usuario
    register: (req, res) => {
        const { tipo_de_user, email, contraseña, id_curso, nombre } = req.body;

        try {
            if (!tipo_de_user || (tipo_de_user !== 'profesor' && tipo_de_user !== 'estudiante')) {
                return res.status(400).json({ error: "El tipo de usuario es obligatorio y debe ser 'profesor' o 'estudiante'" });
            }

            if (tipo_de_user === 'profesor') {
                if (!email || !contraseña) {
                    return res.status(400).json({ error: "Correo electrónico y contraseña son obligatorios para profesores" });
                }

                const queryProfesor = "INSERT INTO profesores (email, contrasena) VALUES (?, ?)";
                db.query(queryProfesor, [email, contraseña], (err, results) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({ error: "El correo electrónico ya está en uso" });
                        }
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({ message: "Profesor registrado exitosamente", userId: results.insertId });
                });

            } else if (tipo_de_user === 'estudiante') {
                if (!id_curso || !nombre || !contraseña) {
                    return res.status(400).json({ error: "ID de curso, nombre y contraseña son obligatorios para estudiantes" });
                }

                const queryEstudiante = "INSERT INTO estudiantes (id_curso, nombre, contrasena) VALUES (?, ?, ?)";
                db.query(queryEstudiante, [id_curso, nombre, contraseña], (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({ message: "Estudiante registrado exitosamente", userId: results.insertId });
                });
            }

        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    },

    // Inicio de sesión
    login: (req, res) => {
        const { tipo_de_user, email, contraseña, id_curso } = req.body;

        if (!tipo_de_user || (tipo_de_user !== 'profesor' && tipo_de_user !== 'estudiante')) {
            return res.status(400).json({ error: "El tipo de usuario es obligatorio y debe ser 'profesor' o 'estudiante'" });
        }

        // Lógica de inicio de sesión para profesores
        if (tipo_de_user === 'profesor') {
            const query = "SELECT * FROM profesores WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });

                if (results.length === 0 || results[0].contrasena !== contraseña) {
                    return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
                }

                const profesor = results[0];
                res.status(200).json({
                    message: "Inicio de sesión de profesor exitoso",
                    user: {
                        id: profesor.id_usuario,
                        email: profesor.email
                    }
                });
            });

        // Lógica de inicio de sesión para estudiantes
        } else if (tipo_de_user === 'estudiante') {
            const query = "SELECT * FROM estudiantes WHERE id_curso = ? AND contrasena = ?";
            db.query(query, [id_curso, contraseña], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });

                if (results.length === 0) {
                    return res.status(401).json({ message: "ID de curso o contraseña incorrectos" });
                }

                const estudiante = results[0];
                res.status(200).json({
                    message: "Inicio de sesión de estudiante exitoso",
                    user: {
                        id: estudiante.id_usuario,
                        id_curso: estudiante.id_curso
                    }
                });
            });
        }
    }
};

module.exports = AutenController;
