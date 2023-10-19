// Controlador del modelo de proyectos
// hace uso de llamadas asincronas para asegurar
// la respuesta. Utiliza acceso a las funciones 
// auto gereradas por sequelize para leer y escribir en el modelo.
const models = require('../models');
const Op = models.Sequelize.Op;

const getAll = async function (req,res) {
    models.Proyecto.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error a la hora de leer los proyectos."
            }
        );
    });
}

const getById = async function (req,res) {
    models.Proyecto.findByPk(req.params.id)
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
            message: "Hubo un error a la hora de leer los proyectos."
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

    const proyecto = {
        idProyecto: req.body.idProyecto,
        idDonatario: req.body.idDonatario,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    models.Proyecto.create(proyecto)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "Hubo un error al generar el proyecto."
        });
    });
};

const patch = async function (req,res) {
    models.Proyecto.update(req.body,{
        where: { id: req.params.id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "El proyecto fue actualizado."
            });
        } 
        else {
            res.send({
                message: "Error en el body o proyecto no encontrado."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Hubo un error a la hora de actualizar un proyecto."
        });
    });
};


const deleteAll = async function (req,res) {
    exports.deleteAll = (req, res) => {
        models.Proyecto.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: "Todas las entradas fueron eliminadas con exito" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error a la hora de eliminar los proyectos."
            });
        });
    }
}

const deleteById = async function (req,res) {
    models.Proyecto.destroy({
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
            message: "Hubo un error a la hora de eliminar el proyecto."
        });
    });
}

exports.getAll = getAll;
exports.getById = getById;
exports.add = add;
exports.patch = patch;
exports.deleteAll = deleteAll;
exports.deleteById = deleteById;