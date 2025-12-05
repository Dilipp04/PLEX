const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const AuthMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWTSIGN);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    //custom property
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized token" });
  }
};

module.exports = AuthMiddleware;
