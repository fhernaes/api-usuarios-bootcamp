const User = require("../models/user.model");
const Bootcamp = require("../models/bootcamp.model");
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
const {firstName, lastName, email, password} = req.body;
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: "Usuario creado"});
  } catch (err) {
    console.log(`>> Error al crear el usuario ${err}`);
    throw err;
  }
};

const findUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "createdAt","updatedAt"] }, 
      include: [
        {
          model: Bootcamp,
          as: "bootcamps",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json({ message: "Usuario encontrado", user });
  } catch (err) {
    console.log(`>> Error mientras se encontraba el usuario: ${err}`);
    throw err;
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "createdAt","updatedAt"] }, 
      include: [
        {
          model: Bootcamp,
          as: "bootcamps",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

   res.status(200).json({ message: "Usuarios encontrados", users});
  } catch (err) {
    console.log(">> Error Buscando los Usuarios: ", err);
    throw err;
  }
};

const updateUserById = async (req,res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  const {firstName, lastName} = req.body;
    const updatedUser = await User.update(
      {
        firstName,
        lastName
      },
      {
        where: {
          id: userId,
        },
      }
    );

  res.status(200).json({ message: "Usuario actualizado"});
  } catch (err) {
    console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
    throw err;
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ message: "Usuario eliminado"});
  } catch (err) {
    console.log(`>> Error mientras se eliminaba el usuario: ${err}`);
    throw err;
  }
};

const signIn = async (req, res) => {
    res.json({ code: 200, message: "Login correcto.", token: req.token });
};


module.exports = {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
  signIn,
};
