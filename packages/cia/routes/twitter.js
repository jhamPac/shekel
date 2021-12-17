const express = require("express")
const router = express.Router()
const twitterClient = require("../twitter/client.js")

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

    try {
        const tweet = await twitterClient.v2.singleTweet(tweetId, {
            expansions: ["author_id"],
        })

        const ownsTweet = userId === tweet.includes.users[0].id

        const data = ownsTweet ? { ...tweet.data, ownsTweet: true } : { ownsTweet: false }

        res.json({
            data: {
                ...data,
            },
            error: false,
        })
    } catch (e) {
        res.json({
            data: {
                ownsTweet: false,
                error: true,
            },
        })
    }
})

module.exports = router
