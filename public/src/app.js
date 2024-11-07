const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const config = require("./config");
const AutenRouters = require('./routes/AutenRouters');
const EstudianteRouters = require('./routes/EstudianteRouters');
const ProfesorRouters = require('./routes/ProfesorRouters');
const EvaluacionRouters = require('./routes/EvaluacionRouters');

const app = express();//hola

app.set('port', config.app.port); // Configuración del puerto

app.use(cors({ origin: 'http://localhost:5173' })); // Permite el acceso desde el frontend en localhost:5173
app.use(express.json());

// Rutas
app.use('/Auten', AutenRouters);
app.use('/Estudiantes', EstudianteRouters);
app.use('/Profesores', ProfesorRouters);
app.use('/Evaluaciones', EvaluacionRouters);

module.exports = app;
