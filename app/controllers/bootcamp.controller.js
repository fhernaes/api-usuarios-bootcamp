const Bootcamp = require("../models/bootcamp.model");
const User = require("../models/user.model");

const createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;
  try {
    const createdBootcamp = await Bootcamp.create({
      title,
      cue,
      description
    });
    res.status(201).json({ message: "Bootcamp creado", createdBootcamp });
  } catch (err) {
    console.log(`>> Error al crear el bootcamp: ${err}`);
    throw err;
  }
};

const addUser = async (req, res) => {
  try {
    const { bootcampId } = req.body;
    const { userIds } = req.body;

    const bootcamp = await Bootcamp.findByPk(bootcampId);

    if (!bootcamp) {
      res.status(404).json({ message: "Bootcamp no encontrado" });
    }
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      res.status(404).json({ message: "Ningún usuario encontrado" });
    }
    await bootcamp.addUsers(users);
    res.status(200).json({ message: "Usuarios agregados al bootcamp con éxito", data: bootcamp });
  } catch (err) {
    console.log(">> Error mientras se estaban agregando los usuarios al Bootcamp", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const findById = async (req, res) => {
  const bootcampId = req.params.id;

  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId, {
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
    res.status(200).json({ message: "Bootcamp encontrado", data: bootcamp });
  } catch (err) {
    console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
    throw err;
  }
};

const findAll = async (req, res) => {
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

    res.status(200).json({ message: "Bootcamps encontrados", data: bootcamps });
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
