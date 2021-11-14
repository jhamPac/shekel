const express = require("express")
const router = express.Router()

const screenshotTweet = require("../twitter/ss.js")

router.post("/create", async (req, res) => {
    const { tweetId } = req.query

    const { ok } = screenshotTweet(tweetId)

    if (ok) {
        res.json({
            data: "Success",
            error: false,
        })
    } else {
        res.json({
            data: [],
            error: true,
        })
    }
})

module.exports = router
