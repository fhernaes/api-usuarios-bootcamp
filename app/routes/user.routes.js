const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { emitToken, verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, userController.findAll);
router.post("/signup", userController.createUser);
router.post("/signin", emitToken, userController.signIn);
router.get("/:id", verifyToken, userController.findUserById);
router.put("/:id", verifyToken, userController.updateUserById);
router.delete("/:id", verifyToken, userController.deleteUserById);


module.exports = router;