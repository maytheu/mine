const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')

require("dotenv").config();

const app = express();
app.use(cors({credentials: true,
  origin: "https://maytheuresume.herokuapp.com/"}));

require("./models/mainSchema.js");
require("./models/userSchema.js");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(express.static("client/build"));

require("./routes/user")(app);
require("./routes/resume")(app);

// DEFAULT
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
