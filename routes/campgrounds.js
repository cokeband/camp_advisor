const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampgound } = require("../middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Campground = require("../models/campground");

router.route("/")
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampgound, catchAsync(campgrounds.createCampground));
    .post(upload.array("image"), (req, res) => {
        console.log(req.body, req.file);
        res.send("It worked!")
    })

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampgound, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, validateCampgound, catchAsync(campgrounds.renderEditForm));

module.exports = router;