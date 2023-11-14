const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const personasController = require('../controladores/personas');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'password';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //Una vez agregada la estrategia de Google en frontend
    //agregar estrategia de verificacion de todos los usuarios
    console.log(jwt_payload);
    if (jwt_payload.nombre == "AMLO") {
        return done(null, jwt_payload.nombre);
    }
    else {
        return done(null, false);
    }
}));

module.exports = passport;