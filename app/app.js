const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const bootcampRoutes = require("./routes/bootcamp.routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/user", userRoutes);
app.use("/api/bootcamp", bootcampRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Ruta raíz" });
});




module.exports =  app ;
