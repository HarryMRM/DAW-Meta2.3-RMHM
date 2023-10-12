'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Proyecto.belongsToMany(models.Persona,
        {
          through: models.Donador, 
          as: "Donadores",
          foreignKey: "idProyecto",
          otherKey: "idPersona"
        })
      // models.Proyecto.belongsTo(models.Persona,
      //   {
      //     foreignKey: "idProyecto",
      //   })
    }
  }
  Proyecto.init({
    idProyecto: {
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
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proyecto',
  });
  return Proyecto;
};