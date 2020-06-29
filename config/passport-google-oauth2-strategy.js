const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
// authentication using google
passport.use(new GoogleStrategy({
    clientID: "585867344449-oee6ecf3fjsgv9ltj3k2s8qhdhrad7gs.apps.googleusercontent.com",
    clientSecret: "****",
    callbackURL: "http://localhost:1003/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // check if user exist
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("error in google aouth", err);
                return;
            }
            console.log(profile);
            if (user) {
                // if user exist signin
                done(null, user);
            }
            else {
                // if user does not exist create a new user and then signin
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                },
                    function (err, user) {
                        if (err) {
                            console.log("error in creating user in google oauth ", err);
                            return;
                        }
                        done(null, user);
                    });
            }
        });

    })
);

module.exports = passport;