// Permite revisar la integridad de la request
// para reducir posibles errores.
function verificarRequest(req,res,next){
    if (JSON.stringify(req.body) === '{}'){
        res.status(400);
        res.send("Error: Solicitud mal hecha")
    }
    else{
        next();
    }
}

// Archivo Router para Personas, todo el codigo es
// autodescriptivo.
const express = require('express');
const router = express.Router();
const personasController = require('../controladores/personas');

const miPassport = require('../passport.js');

router.get('/', miPassport.authenticate('jwt',{ session: false}), personasController.getAll);

router.get("/:id", miPassport.authenticate('jwt',{ session: false}), personasController.getById);

router.post("/", miPassport.authenticate('jwt',{ session: false}), verificarRequest, personasController.add);

router.patch("/:id", miPassport.authenticate('jwt',{ session: false}), verificarRequest, personasController.patch);

router.delete("/", miPassport.authenticate('jwt',{ session: false}), personasController.deleteAll);
router.delete("/:id",  miPassport.authenticate('jwt',{ session: false}), personasController.deleteById);
module.exports = router;