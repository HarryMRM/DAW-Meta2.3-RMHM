const cors = require('cors');
const express = require('express');
const proyectosRouter = require('./routes/proyectos');
const personaRouter = require('./routes/personas');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJwt = require('./routes/auth');
const fs = require('fs');
const app = express();
const port = 3000;
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
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', passportJwt);
app.use('/proyectos', proyectosRouter);
app.use('/personas', personaRouter);

httpsServer.listen(port, () => {
    console.log('Servidor en escucha en el puerto:', port);
}).on('error', err => {
    console.log('test');
});