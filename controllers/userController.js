const User = require("../models/user");
const passport = require("passport");

// view/render login page
module.exports.loginPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/home");
    }
    return res.render("login", { title: "login" });
}

// view/render signup page
module.exports.signupPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/home");
    }
    return res.render("signup", { title: "signUp" });
}

// signup user
module.exports.signupUser = async function (req, res) {
    try {
        //check password and confirm password match
        if (req.body.password != req.body.confirm) {
            req.flash("error","Password and confirm password does not match");
            return res.redirect('back');
        }
        //check if a user exist with same email
        let user = await User.findOne({ email: req.body.email });
        // if user does not exist create new user
        if (!user) {
            await User.create(req.body);
            req.flash("success","User Registered");
            return res.redirect('/');
        } else {
            req.flash("error","This email already exist");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
}

// view/render home page 
module.exports.homePage = function(req,res){
    return res.render("home",{title:"home"});
}

// signin user 
module.exports.signinUser = function(req,res){
    req.flash("success","Login Successfully");
    return res.redirect("/user/home");
}

// signout user
module.exports.signoutUser = function(req,res){
    req.logout();
    req.flash("success", "yo have logged out!");
    return res.redirect("/");
}