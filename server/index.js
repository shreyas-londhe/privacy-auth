// server/index.js

const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.post("/signup", function (req, res) {
  var username = req.body.user;
  var password = req.body.password;
  var privateId = req.body.privateId;
  console.log(
    "User name = " +
      username +
      ", password is " +
      password +
      "with privateId" +
      privateId
  );
  res.end("yes");
});

app.post("/signin", function (req, res) {
  var username = req.body.user;
  var password = req.body.password;
  console.log("User name = " + username + ", password is " + password);
  res.end("yes");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
