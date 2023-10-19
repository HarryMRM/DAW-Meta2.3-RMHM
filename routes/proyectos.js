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
router.get("/", proyectosController.getAll);
router.get("/:id", proyectosController.getById);
router.get("/:id/donadores", proyectosController.getById);
router.get("/:id/donatarios", proyectosController.getById);

router.post("/", verificarRequest, proyectosController.add);

router.patch("/:id", verificarRequest, proyectosController.patch);

router.delete("/", proyectosController.deleteAll);
router.delete("/:id", proyectosController.deleteById);
module.exports = router;