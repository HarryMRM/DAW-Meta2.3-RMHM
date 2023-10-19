// Controlador del modelo de personas
// hace uso de llamadas asincronas para asegurar
// la respuesta. Codigo Autodescriptivo.
const models = require('../models');
const Op = models.Sequelize.Op;

const getAll = async function (req,res) {
    models.Persona.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error a la hora de leer los personas."
            }
        );
    });
}

const getById = async function (req,res) {
    models.Persona.findByPk(req.params.id)
    .then(data => {
        if (data) {
            res.send(data);
        } 
        else{
            res.status(404).send({
            message: "El indice solicitado no fue hallado."
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Hubo un error a la hora de leer las personas."
        });
    });
}

const add = async function (req,res) {
    if (!req.body.title) {
        res.status(400).send({
            message: "Solicitud no valida"
        });
        return;
    }

    const persona = {
        rfc: req.body.rfc,
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    models.Persona.create(persona)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "Hubo un error al generar la persona."
        });
    });
};

const patch = async function (req,res) {
    models.Persona.update(req.body,{
        where: { id: req.params.id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La persona fue actualizado."
            });
        } 
        else {
            res.send({
                message: "Error en el body o persona no encontrada."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Hubo un error a la hora de actualizar una persona."
        });
    });
};


const deleteAll = async function (req,res) {
    exports.deleteAll = (req, res) => {
        models.Persona.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: "Todas las entradas fueron eliminadas con exito" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error a la hora de eliminar las personas."
            });
        });
    }
}

const deleteById = async function (req,res) {
    models.Persona.destroy({
        where: { id: req.params.id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Se elimino con exito"
            });
        } 
        else{
            res.send({
                message: "El indice solicitado no fue hallado."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Hubo un error a la hora de eliminar la persona."
        });
    });
}

exports.getAll = getAll;
exports.getById = getById;
exports.add = add;
exports.patch = patch;
exports.deleteAll = deleteAll;
exports.deleteById = deleteById;