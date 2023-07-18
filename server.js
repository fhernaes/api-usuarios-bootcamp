const sequelize = require('./app/config/db.config.js');
const instructions = require('./app/instructions');
const associations = require('./app/models/associations');
const app = require('./app/app');

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado con éxito a la base de datos.");
    await sequelize.sync({ force: false, alter: false });
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
};

main();







