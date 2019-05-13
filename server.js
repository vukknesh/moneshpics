const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const image = require("./routes/api/image");

const cors = require("cors");

const imageUploadRoutes = require("./routes/api/image-upload");

const app = express();
app.use(cors());
//body-parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

//connect mongo DB

mongoose
  .connect(db)
  .then(() => {
    console.log("MONGODB connected");
  })
  .catch(err => console.log(err));

//Passport middleware

app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);

// Use Routes
let router = require("./routes/api/upload.router.js");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/image", image);

app.use("/api/file", router);
app.use("/api/v1", imageUploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
