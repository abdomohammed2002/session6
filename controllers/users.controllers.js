const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/users.model");
const appErrors = require("../utils/appErrors");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({}, { __v: false, password: false });
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { users } })
    .limit(limit)
    .skip(skip);
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, roles } = req.body;
  const file = req.file;
  console.log("file", file);
  const user = await User.findOne({ email });
  if (user) {
    const error = appErrors.create(
      400,
      httpStatusText.FAIL,
      "user already exists"
    );
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    roles,
    avatar: file.filename,
  });
  const token = await generateToken({
    email: newUser.email,
    _id: newUser._id,
    roles: roles,
  });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = appErrors.create(400, httpStatusText.FAIL, "user not found");
    return next(error);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = appErrors.create(400, httpStatusText.FAIL, "wrong password");
    return next(error);
  }
  const token = await generateToken({
    email: user.email,
    _id: user._id,
    roles: user.roles,
  });
  user.token = token;
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
module.exports = {
  getAllUsers,
  register,
  login,
};
