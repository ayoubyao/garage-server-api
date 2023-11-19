'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voitures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voitures.init({
    nom: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    primaryImage: DataTypes.STRING,
    year: DataTypes.INTEGER,
    kilometrage: DataTypes.INTEGER,
    options: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'voitures',
    timestamps: false
  });
  return Voitures;
};