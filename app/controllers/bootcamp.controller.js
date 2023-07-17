const Bootcamp = require("../models/bootcamp.model");
const User = require("../models/user.model");

const createBootcamp = async (bootcamp) => {
  try {
    const createdBootcamp = await Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description,
    });

    console.log(`>> Creado el bootcamp: ${JSON.stringify(createdBootcamp, null, 4)}`);
    return createdBootcamp;
  } catch (err) {
    console.log(`>> Error al crear el bootcamp: ${err}`);
    throw err;
  }
};

const addUser = async (bootcampId, userId) => {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      console.log("No se encontró el Bootcamp!");
      return null;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      console.log("Usuario no encontrado!");
      return null;
    }

    await bootcamp.addUser(user);
    console.log("***************************");
    console.log(
      `Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`
    );
    console.log("***************************");

    return bootcamp;
  } catch (err) {
    console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    throw err;
  }
};

const findById = async (Id) => {
  try {
    const bootcamp = await Bootcamp.findByPk(Id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "firstName", "lastName"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return bootcamp;
  } catch (err) {
    console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
    throw err;
  }
};

const findAll = async () => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "firstName", "lastName"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return bootcamps;
  } catch (err) {
    console.log(">> Error Buscando los Bootcamps: ", err);
    throw err;
  }
};

module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
