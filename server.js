const sequelize = require('./app/config/db.config.js');
const instructions = require('./app/instructions');
const associations = require('./app/models/associations');

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado con éxito a la base de datos.");
    await sequelize.sync({ force: true, alter: true });
    instructions();

  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
};

main();







