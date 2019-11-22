var express = require("express");
var router = express.Router();


router.get("/campgrounds", function(req, res){

    // Get all camground from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});
router.post("/campgrounds",function(req, res){
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamground = {name: name, image: image, description: description};
    Campground.create(newCamground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

route.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    }); 
});

module.exports  = router;