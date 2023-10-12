const models = require('./models');
const Op = require('Op');
// Op.or
async function getAllPersonas() {
    //models.sequelize.sync().then(() => {
        models.Persona.findAll()
            .then(r => {
                r.forEach(persona =>{
                    console.log(persona.dataValues);
                });
            models.sequelize.close();
        });
    //});
}

async function getAllProyectos() {
    //models.sequelize.sync().then(() => {
        models.Proyecto.findAll()
            .then(r => {
                r.forEach(proyecto =>{
                    console.log(proyecto.dataValues);
                });
            models.sequelize.close();
        });
    //});
}

async function test() {
    let persona = await models.Persona.findOne({
        where: {
            rfc: 'CCCC'
        }
    });
    let persona2 = await models.Persona.findOne({
        where: {
            rfc: 'AAAA'
        }
    });
    let proyectoPri = await models.Proyecto.findByPk(1);
    let proyectoGortari = await models.Proyecto.findByPk(3);
    await proyectoPri.addDonadores(persona,{through: {cantidadDonada:10000.50}});
    await proyectoGortari.addDonadores(persona,{through: {cantidadDonada:150.50}});
    await proyectoGortari.addDonadores(persona2,{through: {cantidadDonada:10050.50}});
    let donadores = await persona.getDonadores();
    donadores.forEach(e => {
        console.log(e.nombre);
    });
    let donadoresPri = await proyectoGortari.getDonadores();
    donadoresPri.forEach(e => {console.log(e.nombre,e.imagen)})
    models.sequelize.close();
}


// getAllPersonas();
// getAllProyectos();
test();