const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const makeToken = require("../utils/makeToken");

const registerUser = asyncHandler(async (req, res) => {
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

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: makeToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

module.exports = { registerUser, authUser };
