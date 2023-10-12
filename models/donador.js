'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donador.init({
    idPersona: DataTypes.INTEGER,
    idProyecto: DataTypes.INTEGER,
    cantidadDonada: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Donador',
    tableName: 'Donadores',
    name: {
      singular:'Donador',
      plural: 'Donadores'
    }
  });
  return Donador;
};