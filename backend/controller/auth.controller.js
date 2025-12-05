const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json({ hello: "hello" });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email Already Exist!!" });
    }
    const userCreated = await User.create({
      username,
      email,
      password: password,
    });
    res.status(201).json({
      msg: "Registration successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "Email Doesn't Exist , Please register!!" });
    }

    const checkedToken = await userExist.compareToken(password);
    if (checkedToken) {
      res.status(201).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ msg: "Invalid Credential" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const user = async (req, res) => {
  try {
    const data = req.user;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { home, register, login, user };
