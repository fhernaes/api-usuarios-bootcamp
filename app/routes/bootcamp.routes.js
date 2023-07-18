const express = require("express");
const router = express.Router();
const bootcampController = require("../controllers/bootcamp.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/", bootcampController.findAll);
router.post("/", verifyToken ,bootcampController.createBootcamp);
router.get("/:id", verifyToken,bootcampController.findById);
router.post("/addUser",verifyToken, bootcampController.addUser);


module.exports = router;