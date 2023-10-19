'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Persona.belongsToMany(models.Proyecto,
        {
          through: models.Donador, 
          as: "Donadores",
          foreignKey: "idPersona",
          otherKey: "idProyecto"
        });
      models.Persona.hasMany(models.Proyecto,
        {
          foreignKey: 'idDonatario',
          as: "Donatario"
        });
    }
  }
  Persona.init({
    rfc:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};