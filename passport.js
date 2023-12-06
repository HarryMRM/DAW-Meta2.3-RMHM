const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKey = 'secreto';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    //Una vez agregada la estrategia de Google en frontend
    //agregar estrategia de verificacion de todos los usuarios
    console.log(jwtPayload);
    console.log("test");
    if (jwtPayload.userId == "106684422845012754148") {
        return done(null, jwtPayload);
    }
    else {
        return done(null, false);
    }
}));

module.exports = passport;