const express = require("express")
const router = express.Router()

const screenshotTweet = require("../twitter/ss.js")

router.post("/screenshot/create", async (req, res) => {
    const { tweetId } = req.query

    const { ok } = await screenshotTweet(tweetId)

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

router.get("/search", async (req, res) => {
    const { userId, tweetId } = req.query

    console.log(userId, tweetId)

    res.json({
        data: "Success",
        error: false,
    })
})

module.exports = router
