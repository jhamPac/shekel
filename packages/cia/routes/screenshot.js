var express = require("express")
var router = express.Router()

router.post("/create", async (req, res, next) => {
    const { tweetId } = req.query
    const twitterURL = "https://twitter.com/anyuser/status/"

    res.json({
        data: "Success",
        error: false,
    })
})

module.exports = router
