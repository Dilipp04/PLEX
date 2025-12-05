const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

//This function runs before saving user
UserSchema.pre("save", async function (next) {
  const user = this;

  try {
    const saltRound = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//intense method to generate JWT token
UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWTSIGN,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {}
};
//intense method to compare the password
UserSchema.methods.compareToken = async function (loginPassword) {
  const user = this;
  const result = await bcrypt.compare(loginPassword, user.password);
  if (result) {
    return user.password;
  }
};

module.exports = mongoose.model("User", UserSchema);
