const User = require("../models/user");
const passport = require("passport");
const resetMail = require("../mailers/reset_mail");

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
            req.flash("error", "Password and confirm password does not match");
            return res.redirect('back');
        }
        //check if a user exist with same email
        let user = await User.findOne({ email: req.body.email });
        // if user does not exist create new user
        if (!user) {
            await User.create(req.body);
            req.flash("success", "User Registered");
            return res.redirect('/');
        } else {
            req.flash("error", "This email already exist");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
}

// view/render home page 
module.exports.homePage = function (req, res) {
    return res.render("home", { title: "home" });
}

// signin user 
module.exports.signinUser = function (req, res) {
    req.flash("success", "Login Successfully");
    return res.redirect("/user/home");
}

// signout user
module.exports.signoutUser = function (req, res) {
    req.logout();
    req.flash("success", "yo have logged out!");
    return res.redirect("/");
}

// request for reseting password and get mail of link of resetting password
module.exports.resetPasswordRequest = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log("error in finding user", err);
            return;
        }
        if (user) {
            // for getting mail with link of resetting password
            resetMail.reset(user);
            // render/view a page with information about resetting password mail send to your email
            return res.render("reset_notification", { title: "Reset Notification" });
        }
        else {
            // if use does not exist return back
            return res.redirect("back");
        }
    })
}

// view/render reset password form
module.exports.resetPasswordForm = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log("error in finding user", err);
            return;
        }
        if (user) {
            return res.render("reset_pass", { title: "Reset Form", user: user });
        }
        else {
            return res.redirect("/");
        }
    });
}

// reset password
module.exports.resetPassword = function (req, res) {
    if (req.body.password != req.body.confirm) {
        req.flash("error", "Password and confirm password does not match");
        return res.redirect('back');
    }
    else {
        User.findByIdAndUpdate(req.params.id, { password: req.body.password }, function (err) {
            if (err) {
                console.log("error in updating password", err);
                return;
            }
            // after updating new password logout user if user is login
            req.logout();
            req.flash("success", "Password Reseted Successfully, please login using new passsword");
            return res.redirect("/");
        });
    }
}

// view/render forget password page
module.exports.forgetPasswordForm = function(req,res){
    return res.render("forget_password",{title:"Forgot Password"});
}

// submit forgot password form and getting mail with link for resetting password
module.exports.forgetPassword = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user",err);
            return;
        }
        if(user){
            // for getting mail with link of resetting password
            resetMail.reset(user);
            // render/view a page with information about resetting password mail send to your email
            return res.render("reset_notification", { title: "Reset Notification" });
        }
        else{
            req.flash("error","User with this email does not exist");
            return res.redirect("back");
        }
    })
}