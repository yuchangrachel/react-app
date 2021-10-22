const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/adminControllers");

const { authPart } = require("../middlewares/authMiddleware");
router.route("/").get(authPart, getAllUsers);
router.route("/create").post(authPart, createUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(authPart, updateUser);
router.route("/:id").delete(authPart, deleteUser);

module.exports = router;
