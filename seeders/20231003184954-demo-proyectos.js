'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('proyectos', 
    [{
      idProyecto: "A1",
      idDonatario: 1,
      nombre: "Proyecto PRI",
      imagen: "trucoteca.com",
      descripcion: "Adios a Morena",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idProyecto: "A2",
      idDonatario: 2,
      nombre: "Proyecto Morena",
      imagen: "trucoteca.com",
      descripcion: "otro dato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idProyecto: "A3",
      idDonatario: 3,
      nombre: "Proyecto Gortari",
      imagen: "trucoteca.com",
      descripcion: "Mexico no tiene hambre",
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
