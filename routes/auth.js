const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretKey = '176211644853-pncrsvlg71og596lic3u3ci8grt0nu6o.apps.googleusercontent.com'; // Reemplaza esto con tu clave secreta
const router = express.Router();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    return done(null, jwt_payload);
}));

router.post('/verificarToken', async (req, res) => {
    let url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
    let urlFetch = url.concat(req.body.credential);
    try {
        const googleResponse = await fetch(urlFetch);
        const googleData = await googleResponse.json();
        if(googleData.aud === '176211644853-fnua99b0b5dn52jfs7cru2ukip2b1cos.apps.googleusercontent.com'){
            const payload = {
                userId: googleData.sub,
                expiresIn: '60',
            };
            const jwtToken = jwt.sign(payload,'secreto');
            res.json({ success: true, jwtToken });
        }
        else{
            res.status(401).json({ success: false, error: 'Token de Google inválido' });
        }
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        res.status(401).json({ success: false, error: 'Token de Google inválido' });
    }
});

router.get('/rutaProtegida', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Acceso autorizado' });
});

module.exports = router;
