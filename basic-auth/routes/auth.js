const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/User");

// write the get /signup route to show a form
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  //   console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // const { username, password } = req.body;

  // check if the password is long enough and username is not empty
  if (password.length < 8) {
    res.render("signup", { message: "Your password must be 8 char. min." });
    return;
  }
  if (username === "") {
    res.render("signup", { message: "Your username cannot be empty" });
    return;
  }

  User.findOne({ username: username }).then(found => {
    if (found !== null) {
      res.render("signup", { message: "This username is already taken" });
    } else {
      // we can create a user with the username and password pair
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then(dbUser => {
          res.redirect("/");
        })
        .catch(err => {
          next(err);
        });
    }
  });
});

module.exports = router;
