const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
  address: String,
  bio: String,
  contactMessage: String,
  email: String,
  git: String,
  download: String,
  web: String,
  social: [String],
});

mongoose.model("mains", mainSchema);
