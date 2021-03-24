const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mailer = require("nodemailer");

const Main = mongoose.model("mains");

const check = require("../utils/check");
const userAuth = require("../utils/userAuth");

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH,
    accessToken: process.env.GOOGLE_ACCESS,
  },
};
const transporter = mailer.createTransport(transport);

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
    let d = new Date();
    if (
      check.verifyContent(className) ||
      check.verifyContent(name) ||
      check.verifyContent(url)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    const social = [];
    let id = `social-${d.getTime()}`;
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
    let id = req.query.id;
    Main.update({}, { $pull: { social: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/education", userAuth, (req, res) => {
    const { degree, description, graduated, school } = req.body;
    let d = new Date();
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
    let id = `edu-${d.getTime()}`;
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
    let id = req.query.id;
    Main.update({}, { $pull: { education: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/skills", userAuth, (req, res) => {
    const { name, level } = req.body;
    if (check.verifyContent(name) || check.verifyContent(level))
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let d = new Date();
    let skills = [];
    let id = `skills-${d.getTime()}`;
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
    let id = req.query.id;
    Main.update({}, { $pull: { skills: { id } } }, { multi: true }).exec(
      (err, doc) => {
        if (err) return res.status(403).send({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
  });

  app.post("/api/user/project", userAuth, (req, res) => {
    const { link, description, title, github } = req.body;
    let d = new Date();
    if (
      check.verifyContent(link) ||
      check.verifyContent(description) ||
      check.verifyContent(title) ||
      check.verifyContent(github)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    let work = [];
    let id = `work-${d.getTime()}`;
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
    let id = req.query.id;
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
    upload(req, res, (err) => {
      if (err) return res.status(500).send("Please upload a file");
      return res.status(200).json({ success: true, file: req.file.filename });
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
    const message = `${req.body} - sent from ${email}`;
    if (
      check.verifyContent(name) ||
      check.verifyContent(subject) ||
      check.verifyContent(message) ||
      check.verifyContent(email)
    )
      return res
        .status(500)
        .send({ success: false, err: "Invalid Parameter parsing" });
    transporter.sendMail(
      {
        from: email,
        to: process.env.RESUME_EMAIL,
        subject,
        text: `${message} from ${email}`,
      },
      (err) => {
        if (err) return res.json({success: false});
        transporter.close();
        return res.status(200).json({ success: true });
      }
    );
  });
};
