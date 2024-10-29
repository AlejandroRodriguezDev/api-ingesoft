const express = require('express');
const dotenv = require('dotenv');
const config = require("./config");
const AutenRouters = require('./routes/AutenRouters');
const EstudianteRouters = require('./routes/EstudianteRouters');
const ProfesorRouters = require('./routes/ProfesorRouters');
const EvaluacionRouters = require('./routes/EvaluacionRouters');
const app = express();

app.set('port',config.app.port)// accede a las configuraciones 


app.use(express.json());

// Rutas
app.use('/Auten', AutenRouters);
app.use('/Estudiantes', EstudianteRouters);
app.use('/Profesores', ProfesorRouters);
app.use('/Evaluaciones', EvaluacionRouters);


module.exports = app;//holi este es un puto cmmit

