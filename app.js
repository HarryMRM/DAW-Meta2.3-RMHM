const cors = require('cors');
const express = require('express');
const proyectosRouter = require('./routes/proyectos');
const personaRouter = require('./routes/personas');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 4000;
const llavePrivada = fs.readFileSync('config\\private.key');
const certificado = fs.readFileSync('config\\certificate.crt');
const credenciales = {
    key: llavePrivada,
    cert:certificado,
    passphrase: "password"
};
const httpsServer = https.createServer(credenciales,app);
app.use(cors());
app.use(express.json());

app.use('/proyectos', proyectosRouter);
app.use('/personas', personaRouter);

httpsServer.listen(port, () => {
    console.log('Servidor en escucha en el puerto:', port);
}).on('error', err => {
    console.log('test');
});