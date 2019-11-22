var express = require("express");
var app = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var Campground    = require("./models/campgrounds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    SeedDB        = require("./seeds"),
    User          = require("./models/User")
    Comment       = require("./models/comment");
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp',
{useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
SeedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty win",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// --------------------

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000, function(){
    console.log("Campground App has started!!!");
});