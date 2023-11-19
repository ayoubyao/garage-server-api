'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temoignages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Temoignages.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    temoignage: DataTypes.STRING,
    Isapproved: DataTypes.NUMBER,
    datecreation: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'temoignages',
    timestamps: false
  });
  return Temoignages;
};