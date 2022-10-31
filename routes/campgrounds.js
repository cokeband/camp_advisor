const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampgound } = require("../middleware");

const Campground = require("../models/campground");

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post("/", isLoggedIn, validateCampgound, catchAsync(campgrounds.createCampground));

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, validateCampgound, catchAsync(campgrounds.renderEditForm));

router.put("/:id", isLoggedIn, isAuthor, validateCampgound, catchAsync(campgrounds.updateCampground));

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;