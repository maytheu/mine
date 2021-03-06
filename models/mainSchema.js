const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
  city: String,
  name: String,
  phone: String,
  state: String,
  street: String,
  bio: String,
  contactMessage: String,
  description: String,
  email: String,
  git: String,
  resume: String,
  web: String,
  social: [],
  education: [],
  skillMessage: String,
  skills: [],
  work: [],
});

mongoose.model("mains", mainSchema);
