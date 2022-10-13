const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuth=require("../config/isAuth");
//login----------------------------------------------------------------------------
router.route("/login").post(async (req, res, next) => {
    try {
      const user = req.body;
      const found = await User.findOne({
        email: user.email,
        password: user.password,
      });
      if (found) {
        let x = 1;
        let token = await found.createAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });
        // res.redirect('homepage');
        res.send({ status: "done" });
      } else {
        let error = new Error("Enter Valid Credantials");
        res.send({error:"Enter Valid Credential"});
      }
    } catch (err) {
        res.send(err);
    }
  })
  .get(async (req, res, next) => {
    res.statusCode = 200;
    res.render('login');
});

//signup-------------------------------------------------------------------------
  router.route("/signup")
    .post(async (req, res, next) => {
    try {
      let user = new User(req.body);
      let token = await user.createAuthToken();
      await user.save();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });
      
      res.send(user);
    } catch (err) {
      next(err);
    }
  })
  .get(async (req, res, next) => {
    res.statusCode = 200;
    res.render('signup');
  })

// signout-----------------------------------------------------------------
  router.route("/signout").post(isAuth, async (req, res, next) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send({ status: "done" });
    } catch (err) {
      next(err);
    }
  });
module.exports = router;