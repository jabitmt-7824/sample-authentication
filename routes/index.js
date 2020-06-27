const express = require("express");
const router = express.Router();
const passport = require('passport');

const userController = require("../controllers/userController");

router.get("/", userController.loginPage);
router.get("/signup", userController.signupPage);
router.post("/signup-user", userController.signupUser);
router.get("/user/home",userController.homePage);
router.post("/signin-user",passport.authenticate("local" ,{failureRedirect:"/signup"}),userController.signinUser);
router.get("/signout-user",userController.signoutUser);
router.get("/auth/google", passport.authenticate("google",{scope:['profile','email']}));
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/"}),userController.signinUser);

module.exports = router;