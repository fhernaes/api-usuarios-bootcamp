const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotEnv = require("dotenv");
const bcrypt = require("bcrypt");
dotEnv.config();


const emitToken = async (req, res, next) => {
  let { email, password } = req.body;

  let user = await User.findOne({
    where: { email },
    attributes: ["id", "firstName", "lastName", "email", "password"]
  });

  if (!user) {
    return res.status(400).json({ code: 400, message: "Error de autenticación." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ code: 400, message: "Error de autenticación." });
  }

  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiración del token en una hora (opcional)
      data: user,
    },
    process.env.PASSWORD_SECRET
  );

  req.token = token;
  next();
};



const verifyToken = (req, res, next) => {
    try {
      let { token } = req.query;
      if (!token) {
        token = req.headers["authorization"];
        if (!token)
          return res
            .status(400)
            .send("ruta protegida, debe proporcionar un token de acceso.");
        token = token.split(" ")[1];
        if (token.length == 0) {
          throw new Error("No se ha proporcionado un token");
        }
      }
  
      jwt.verify(token, process.env.PASSWORD_SECRET, async (error, decoded) => {
        if (error) {
          return res.status(401).json({
            code: 401,
            message:
              "Debe proporcionar un token válido / su token puede estar expirado.",
          });
        }
  
        try {
          let user = await User.findByPk(decoded.data.id, {
            attributes: ["id", "firstName", "lastName", "email"],
          });
          if (!user) {
            return res.status(400).json({
              code: 400,
              message: "Usuario ya no existe en el sistema.",
            });
          }
          req.user = user;
          next();
        } catch (error) {
          res.status(500).json({ code: 500, message: "Error en autenticación." });
        }
      });
    } catch (error) {
      return res.status(401).json({
        code: 401,
        message: error.message,
      });
    }
  };
  
module.exports = {
    emitToken, 
    verifyToken
}
