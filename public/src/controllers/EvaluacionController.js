
const db = require('../../../db');

const EvaluacionController = {
    guardarResultadosYHistorial: (req, res) => {
        const { id_estudiante, resultados } = req.body;
    
        //AQUI SE ACTUALIZA EL PERFIL DEL ESTUDIANTE (SUS INTELIGENCIAS :c )
        const queries = [];
        for (const [inteligencia, porcentaje] of Object.entries(resultados)) {
            const query = `
                INSERT INTO estudiantes_inteligencias (id_estudiante, id_inteligencia, porcentaje)
                VALUES (?, (SELECT id_inteligencia FROM inteligencias WHERE nombre = ?), ?)
                ON DUPLICATE KEY UPDATE porcentaje = VALUES(porcentaje)
            `;
            queries.push(new Promise((resolve, reject) => {
                db.query(query, [id_estudiante, inteligencia, porcentaje], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            }));
        }
    
        Promise.all(queries)
            .then(() => {
                // AQUI SE HACE EL HISTORIAL
                const fecha_evalu = new Date();
                const queryEvaluacion = "INSERT INTO evaluaciones (fecha_evalu) VALUES (?)";
                db.query(queryEvaluacion, [fecha_evalu], (err, evaluacionResult) => {
                    if (err) return res.status(500).json({ error: "Error al crear la evaluación" });
    
                    const id_evaluacion = evaluacionResult.insertId;
                    const queriesHistorial = [];
                    
                    for (const [inteligencia, porcentaje] of Object.entries(resultados)) {
                        const queryResultado = `
                            INSERT INTO resultados_evaluaciones (id_evaluacion, id_estudiante, id_inteligencia, porcentaje)
                            VALUES (?, ?, (SELECT id_inteligencia FROM inteligencias WHERE nombre = ?), ?)
                        `;
                        queriesHistorial.push(new Promise((resolve, reject) => {
                            db.query(queryResultado, [id_evaluacion, id_estudiante, inteligencia, porcentaje], (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            });
                        }));
                    }
    
                    Promise.all(queriesHistorial)
                        .then(() => res.status(201).json({ message: "Resultados y evaluación histórica guardados exitosamente" }))
                        .catch(err => res.status(500).json({ error: err.message }));
                });
            })
            .catch(err => res.status(500).json({ error: err.message }));
    }
    
};

module.exports = EvaluacionController;
