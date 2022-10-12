const express = require("express");
const router = express.Router();
const User = require("../models/user");


const passport = require("passport");
const catchAsync = require("../utils/catchAsync");


router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", catchAsync(async (req, res, next) => {
    res.send(req.body);
}));

module.exports = router;