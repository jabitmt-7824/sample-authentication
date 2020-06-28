const express = require("express");
const router = express.Router();
const passport = require('passport');

const userController = require("../controllers/userController");

// login page
router.get("/", userController.loginPage);

// signup page
router.get("/signup", userController.signupPage);

// signup User
router.post("/signup-user", userController.signupUser);

// home page of user
router.get("/user/home",userController.homePage);

// signin user
router.post("/signin-user",passport.authenticate("local" ,{failureRedirect:"/"}),userController.signinUser);

// signout user
router.get("/signout-user",userController.signoutUser);

// sigin/signup user using google
router.get("/auth/google", passport.authenticate("google",{scope:['profile','email']}));
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/"}),userController.signinUser);

// request for password reset
router.get("/user/reset-password/request/:id", passport.checkAuthentication, userController.resetPasswordRequest);

// password reset page
router.get("/user/reset-password/form/:id", userController.resetPasswordForm);

// reset password
router.post("/user/reset-password/:id", userController.resetPassword);

//forgot password page
router.get("/forget-password/form",userController.forgetPasswordForm);

//submit forgot password form
router.post("/forget-password",userController.forgetPassword);

module.exports = router;