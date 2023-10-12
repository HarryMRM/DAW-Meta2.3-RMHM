'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('personas', 
    [{
      rfc: "AAAA",
      nombre: "Lazaro Cardenas",
      imagen: "trucoteca.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: "BBBB",
      nombre: "AMLO",
      imagen: "trucoteca.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: "CCCC",
      nombre: "Carlos Salinas de Gortari",
      imagen: "trucoteca.com",
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
