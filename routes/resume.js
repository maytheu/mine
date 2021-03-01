const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Main = mongoose.model("mains");

const check = require("../utils/check");
const userAuth = require("../utils/userAuth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

module.exports = (app) => {
  app.post("/api/user/about", userAuth, (req, res) => {
    const { street, city, state } = req.body;
    const { email } = req.user;
    if (
      check.verifyContent(street) ||
      check.verifyContent(state) ||
      check.verifyContent(city)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    const address = new Main({ street, city, state, email });
    address.save((err) => {
      if (err) return res.status(403).send({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });

  app.post("/api/user/socials", userAuth, (req, res) => {
    const { className, name, url } = req.body;
    if (
      check.verifyContent(className) ||
      check.verifyContent(name) ||
      check.verifyContent(url)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let socials = [];
    socials.push({ className, name, url });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { social: socials } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/education", userAuth, (req, res) => {
    const { degree, description, graduated, school } = req.body;
    if (
      check.verifyContent(degree) ||
      check.verifyContent(description) ||
      check.verifyContent(graduated) ||
      check.verifyContent(school)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let education = [];
    education.push({ degree, school, graduated, description });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { education: education } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/skills", userAuth, (req, res) => {
    const { name, level } = req.body;
    if (check.verifyContent(name) || check.verifyContent(level))
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let skills = [];
    skills.push({ name, level });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { skills: skills } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/work", userAuth, (req, res) => {
    const { company, description, title, years } = req.body;
    if (
      check.verifyContent(company) ||
      check.verifyContent(description) ||
      check.verifyContent(title) ||
      check.verifyContent(years)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let work = [];
    work.push({ company, years, title, description });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { work: work } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/edit_about", userAuth, (req, res) => {
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $set: req.body },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/upload", userAuth, (req, res) => {
    upload(req, res, (err) => {
      if (err) return res.status(500).send("Please upload a file");
      return res.status(200).json({ success: true, file: req.file.filename });
    });
  });

  app.get("/api/user/upload/del", userAuth, (req, res) => {
    const { file } = req.query;
    fs.unlink(path.join(__dirname, `../uploads/${file}`));
  });

  app.get("/api/about", (req, res) => {
    Main.find({}, (err, address) => {
      if (err) return res.status(403).send({ success: false, err });
      return res.status(200).json({ success: true, address: address[0] });
    });
  });
};
