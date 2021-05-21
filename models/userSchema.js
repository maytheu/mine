const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const SALT = 10;

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  token: String,
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next();
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidate, cb) {
  bcrypt.compare(candidate, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.getToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    return cb(null, user);
  });
};

userSchema.statics.findToken = function (token, cb) {
  const user = this;
  jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
    if (err) return cb(err);
    user.findOne({ _id: decode, token }, function (err, user) {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

mongoose.model("users", userSchema);
