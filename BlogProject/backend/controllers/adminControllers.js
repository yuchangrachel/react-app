const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const makeToken = require("../utils/makeToken");

const getAllUsers = asyncHandler(async (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: makeToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Can't create user profile");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "USER not found" });
  }

  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = username;
    user.password = password;
    user.email = email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User remove" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
