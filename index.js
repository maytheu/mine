const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

require("./models/mainSchema.js");
require("./models/userSchema.js");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

require("./routes/user")(app);
require("./routes/resume")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
