const mongoose = require("mongoose");

const User = mongoose.model("users");

const check = require("../utils/check");
const userAuth = require("../utils/userAuth");

module.exports = (app) => {
  app.post("/api/user_login", (req, res) => {
    const { email, password } = req.body;
    if (check.verifyContent(email) || check.verifyContent(password))
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    User.findOne({ email }, (err, user) => {
      if (!user)
        return res
          .status(401)
          .send({ success: false, err: "Invalid Email or Password" });
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch)
          return res
            .status(401)
            .send({ success: false, err: "Invalid Email or Password" });
        user.getToken((err, user) => {
          if (err) return res.status(400).send({ success: false, err });
          res.cookie("resume", user.token).status(200).json({ success: true });
        });
      });
    });
  });

  app.get("/api/user_auth", userAuth, (req, res) => {
    res
      .status(200)
      .json({ success: true, isUser: true, email: req.user.email });
  });

  app.post("/api/user_register", (req, res) => {
    const { email, password } = req.body;
    if (check.verifyContent(email) || check.verifyContent(password))
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    const user = new User({ email, password });
    user.save((err, user) => {
      if (err)
        return res.status(500).send({ success: false, err: "Invalid data" });
      return res.status(200).json({ success: true });
    });
  });

  app.get("/api/user_logout", userAuth, (req, res) => {
    User.findByIdAndUpdate({ _id: req.user._id }, { token: true }, (err) => {
      if (err) return res.status(401).send({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
};
