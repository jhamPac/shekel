const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/twitter", passport.authenticate("twitter"))

router.get("/twitter/login/success", (req, res) => {
    if (req.user) {
        res.json({
            user: req.user,
            cookies: req.cookies,
            error: false,
        })
    }
})

router.get("/twitter/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "user authentication failed",
    })
})

router.get("/twitter/logout", (req, res) => {
    req.logOut()
    res.redirect("http://localhost:9000")
})

router.get(
    "/twitter/redirect",
    passport.authenticate("twitter", {
        successRedirect: "http://localhost:9000",
        failureRedirect: "/api/v1/auth/twitter/login/failed",
    })
)

module.exports = router
