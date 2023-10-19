const cors = require('cors');
const express = require('express');
const proyectosRouter = require('./routes/proyectos');
const personaRouter = require('./routes/personas');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/proyectos', proyectosRouter);
app.use('/personas', personaRouter);

app.listen(port, () => {
    console.log('Servidor en escucha en el puerto:', port);
}).on('error', err => {
    console.log('test');
});