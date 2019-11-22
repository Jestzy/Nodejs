var express = require("express");
var router = express.Router();


route.get("/", function(req, res){
    res.render("landing");
});
// ==========
// AUTH ROUTE
// ==========
//  show register form
route.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
route.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
//show login form
route.get("/login", function(req, res){
    res.render("login");
});
//handel login logic
route.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

route.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports  = router;