const db = require('../../../db');
const bcrypt = require('bcrypt');// para la contraseña segura jeje

const AutenController = {
    login: (req, res) => {
        const { username, contraseña } = req.body;
        const query = "SELECT * FROM usuarios WHERE username = ?";
        
        db.query(query, [username], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (results.length === 0) {
                return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }
    
            const user = results[0];
    
            // Comparar contraseñas para saber si es verda
            const isMatch = await bcrypt.compare(contraseña, user.contraseña);
            if (!isMatch) {
                return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }
    
    
            res.status(200).json({ 
                message: "Inicio de sesión exitoso", 
                user: { 
                    id: user.id, 
                    username: user.username, 
                    tipo_de_user: user.tipo_de_user, 
                    estado: user.estado 
                }
            });
        });
    }
    ,
    register: async (req, res) => {
        try {
            const { id, username, contraseña, nombre, apellido, tipo_de_user, estado, asignatura, id_curso, email } = req.body;
    
            // que todo se haya ingresado, sino paila
            if (!id || !username || !contraseña || !nombre || !apellido || !tipo_de_user) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }
    
            // pa encripta la pasword
            const hashedPassword = await bcrypt.hash(contraseña, 10);
    
            // AQUI CREA EL USUARIOO 
            const newUser = {
                id, 
                username,
                contraseña: hashedPassword,
                nombre,
                apellido,
                tipo_de_user,
                estado: estado || 'Activo'
            };
    
            const queryUser = "INSERT INTO usuarios SET ?";
            db.query(queryUser, newUser, (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ error: "El nombre de usuario o ID ya está en uso" });
                    }
                    return res.status(500).json({ error: err.message });
                }
    
                // DEPENDE DE QUE TIPO DE USER SEA, SE VA A INCERTAR EN LA TABLA CORRESPONDIENTE
                switch (tipo_de_user) {
                    case 'estudiante':
                        // SI ES UN STUDENT VA AQUI DESPUES DEL RESTO
                        const queryEstudiante = "INSERT INTO estudiantes (id_usuario, id_curso) VALUES (?, ?)";
                        db.query(queryEstudiante, [id, id_curso], (err) => {
                            if (err) return res.status(500).json({ error: err.message });
                            res.status(201).json({ message: "Estudiante registrado exitosamente", userId: id });
                        });
                        break;
                        
                    case 'profesor':
                        // SI ES PROFESOOR
                        const queryProfesor = "INSERT INTO profesores (id_usuario, asignatura, id_curso) VALUES (?, ?, ?)";
                        db.query(queryProfesor, [id, asignatura, id_curso], (err) => {
                            if (err) return res.status(500).json({ error: err.message });
                            res.status(201).json({ message: "Profesor registrado exitosamente", userId: id });
                        });
                        break;
                        
                    case 'administrador': //SI ES ADMIN AQUI SE PONE
                        
                        const queryAdministrador = "INSERT INTO administradores (id_usuario, email) VALUES (?, ?)";
                        db.query(queryAdministrador, [id, email], (err) => {
                            if (err) return res.status(500).json({ error: err.message });
                            res.status(201).json({ message: "Administrador registrado exitosamente", userId: id });
                        });
                        break;
                        
                    default:
                        // Tipo de usuario no válido
                        return res.status(400).json({ error: "Tipo de usuario no válido" });
                }
            });
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    
};

module.exports = AutenController;
