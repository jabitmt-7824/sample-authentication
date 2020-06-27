const User = require("../models/user");
const passport = require("passport");

module.exports.loginPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/home");
    }
    return res.render("login", { title: "login" });
}

module.exports.signupPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/home");
    }
    return res.render("signup", { title: "signUp" });
}

module.exports.signupUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm) {
            req.flash("error","Password and confirm password does not match");
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
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

module.exports.homePage = function(req,res){
    return res.render("home",{title:"home"});
}

module.exports.signinUser = function(req,res){
    req.flash("success","Login Successfully");
    return res.redirect("/user/home");
}

module.exports.signoutUser = function(req,res){
    req.logout();
    req.flash("success", "yo have logged out!");
    return res.redirect("/");
}