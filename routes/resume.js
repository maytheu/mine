const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN });

const Main = mongoose.model("mains");

const check = require("../utils/check");
const userAuth = require("../utils/userAuth");

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
});

const S3_BUCKET = process.env.S3_BUCKET;

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: S3_BUCKET,
    key: function (req, file, cb) {
      cb(null, file.originalname.split(".")[0] + "-" + Date.now().toString());
    },
  }),
});

const singleUpload = upload.single("file");

module.exports = (app) => {
  app.post("/api/user/about", userAuth, (req, res) => {
    const { street, city, state } = req.body;
    const { email } = req.user;
    if (
      check.verifyContent(street) ||
      check.verifyContent(state) ||
      check.verifyContent(city)
    ) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    const address = new Main({ street, city, state, email });
    address.save((err) => {
      if (err) return res.status(403).send({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });

  app.post("/api/user/socials", userAuth, (req, res) => {
    const { className, name, url } = req.body;
    const d = new Date();
    if (
      check.verifyContent(className) ||
      check.verifyContent(name) ||
      check.verifyContent(url)
    ) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    const social = [];
    const id = `social-${d.getTime()}`;
    social.push({ className, name, url, id });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { social } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.get("/api/user/socials/delete", userAuth, (req, res) => {
    const id = req.query.id;
    Main.update({}, { $pull: { social: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/education", userAuth, (req, res) => {
    const { degree, description, graduated, school } = req.body;
    const d = new Date();
    if (
      check.verifyContent(degree) ||
      check.verifyContent(description) ||
      check.verifyContent(graduated) ||
      check.verifyContent(school)
    ) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    const education = [];
    const id = `edu-${d.getTime()}`;
    education.push({ degree, school, graduated, description, id });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { education } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.get("/api/user/education/delete", userAuth, (req, res) => {
    const id = req.query.id;
    Main.update({}, { $pull: { education: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/skills", userAuth, (req, res) => {
    const { name, level } = req.body;
    if (check.verifyContent(name) || check.verifyContent(level)) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    const d = new Date();
    const skills = [];
    const id = `skills-${d.getTime()}`;
    skills.push({ name, level, id });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { skills } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.get("/api/user/skills/delete", userAuth, (req, res) => {
    const id = req.query.id;
    Main.update({}, { $pull: { skills: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/project", userAuth, (req, res) => {
    const { link, description, title, github } = req.body;
    const d = new Date();
    if (
      check.verifyContent(link) ||
      check.verifyContent(description) ||
      check.verifyContent(title) ||
      check.verifyContent(github)
    ) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    const work = [];
    const id = `work-${d.getTime()}`;
    work.push({ link, github, title, description, id });
    Main.findOneAndUpdate(
      { email: req.user.email },
      { $push: { work } },
      { new: true },
      (err) => {
        if (err) return res.status(403).send({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });

  app.get("/api/user/project/delete", userAuth, (req, res) => {
    const id = req.query.id;
    Main.update({}, { $pull: { work: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
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
    singleUpload(req, res, (err) => {
      if (err)
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      return res.status(200).json({ success: true, file: req.file.location });
    });
  });

  app.post("/api/user/upload/del", userAuth, (req, res) => {
    const { del } = req.body;
    fs.unlink(path.join(__dirname, `../uploads/${del}`), (err) => {
      if (err) return res.status(500).send("Cant delete file");
      Main.findOneAndUpdate(
        { email: req.user.email },
        { $set: { resume: "" } },
        (err) => {
          if (err) return res.status(403).send({ success: false, err });
          return res.status(200).json({ success: true });
        }
      );
      return res.status(200).json({ success: true });
    });
  });

  app.get("/api/about", (req, res) => {
    Main.find({}, (err, address) => {
      if (err) return res.status(403).send({ success: false, err });
      return res.status(200).json({ success: true, address: address[0] });
    });
  });

  app.get("/api/download/:doc", (req, res) => {
    const doc = req.params.doc;
    return res.download(
      path.join(__dirname, `../uploads/${doc}`),
      doc,
      (err) => {
        if (err) return res.status(404).send("Can't download file");
      }
    );
  });

  app.post("/api/contact", (req, res) => {
    const { name, subject, email } = req.body;
    const message = `${req.body.message} - sent from ${email}`;
    if (
      check.verifyContent(name) ||
      check.verifyContent(subject) ||
      check.verifyContent(message) ||
      check.verifyContent(email)
    ) {
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    }
    mg.messages
      .create(process.env.MAILGUN_URL, {
        from: `Contact <${email}>`,
        to: process.env.RESUME_EMAIL,
        subject,
        text: `${message}`, // from ${email}`,
      })
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.json({ success: false }));
  });
};
