const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
  city: String,
  state: String,
  street: String,
  bio: String,
  contactMessage: String,
  description: String,
  email: String,
  git: String,
  download: String,
  web: String,
  social: [],
  education: [],
  skillMessage: String,
  skills: [],
  work: [],
});

mongoose.model("mains", mainSchema);
