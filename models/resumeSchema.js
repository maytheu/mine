const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  education: [String],
  skillMessage: String,
  skills: [String],
  work: [String],
});

mongoose.model("resumes", resumeSchema);
