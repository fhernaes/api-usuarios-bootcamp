const User = require("../models/user.model");
const Bootcamp = require("../models/bootcamp.model");

const createUser = async (user) => {
  try {
    const createdUser = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    console.log(`>> Se ha creado el usuario: ${JSON.stringify(createdUser, null, 4)}`);
    return createdUser;
  } catch (err) {
    console.log(`>> Error al crear el usuario ${err}`);
    throw err;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
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

    return user;
  } catch (err) {
    console.log(`>> Error mientras se encontraba el usuario: ${err}`);
    throw err;
  }
};

const findAll = async () => {
  try {
    const users = await User.findAll({
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

    return users;
  } catch (err) {
    console.log(">> Error Buscando los Usuarios: ", err);
    throw err;
  }
};

const updateUserById = async (userId, fName, lName) => {
  try {
    const updatedUser = await User.update(
      {
        firstName: fName,
        lastName: lName,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(updatedUser, null, 4)}`);
    return updatedUser;
  } catch (err) {
    console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
    throw err;
  }
};

const deleteUserById = async (userId) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });

    console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(deletedUser, null, 4)}`);
    return deletedUser;
  } catch (err) {
    console.log(`>> Error mientras se eliminaba el usuario: ${err}`);
    throw err;
  }
};

module.exports = {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};
