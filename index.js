const express = require("express");
const port = 1003;

const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const mongoStore = require("connect-mongo")(session);
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const app = express();

app.use(express.static("./assets"));
app.use(expressLayouts);
app.set('layout extractStyles', true);

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    name: 'sample',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore(
        {
            mongooseConnection : db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    ) 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes/index"));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error: ${err}`);
        return;
    }
    console.log("server is successfully setup and running on the port:", port);
});