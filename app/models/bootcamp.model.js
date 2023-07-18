const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Bootcamp = sequelize.define('Bootcamp', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 5,
      max: 20
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = Bootcamp;
