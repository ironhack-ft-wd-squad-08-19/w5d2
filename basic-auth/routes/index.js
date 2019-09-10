const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user;
  res.render("index", { user: user });
});

// create a middleware that checks if a user is logged in

router.get("/private", (req, res) => {
  if (req.session.user) {
    res.render("private");
  } else {
    res.redirect("/login");
  }
});

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("profile");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
