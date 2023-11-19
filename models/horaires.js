'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class horaires extends Model {
        static associate(models) {
            // define association here
          }
    }
    
    horaires.init(
      {
        jour: DataTypes.STRING,
        ouverture: DataTypes.STRING,
        fermeture: DataTypes.STRING,
      },
      { sequelize, modelName: "horaires", 
      timestamps: false 
    }
    );
    return horaires;

    
}
