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
router.get("/", personasController.getAll);
router.get("/:id", personasController.getById);

router.post("/", verificarRequest, personasController.add);

router.patch("/:id", verificarRequest, personasController.patch);

router.delete("/", personasController.deleteAll);
router.delete("/:id", personasController.deleteById);
module.exports = router;