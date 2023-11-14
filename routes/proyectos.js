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

// Archivo Router para Proyectos, todo el codigo es
// autodescriptivo.
const express = require('express');
const router = express.Router();
const proyectosController = require('../controladores/proyectos');
const miPassport = require('../passport.js');

router.get("/", miPassport.authenticate('jwt',{ session: false}), proyectosController.getAll);
router.get("/:id", miPassport.authenticate('jwt',{ session: false}), proyectosController.getById);
router.get("/:id/donadores", miPassport.authenticate('jwt',{ session: false}), proyectosController.getById);
router.get("/:id/donatarios", miPassport.authenticate('jwt',{ session: false}), proyectosController.getById);

router.post("/", miPassport.authenticate('jwt',{ session: false}), verificarRequest, proyectosController.add);

router.patch("/:id", miPassport.authenticate('jwt',{ session: false}), verificarRequest, proyectosController.patch);

router.delete("/", miPassport.authenticate('jwt',{ session: false}), proyectosController.deleteAll);
router.delete("/:id", miPassport.authenticate('jwt',{ session: false}), proyectosController.deleteById);
module.exports = router;