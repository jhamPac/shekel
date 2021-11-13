const express = require("express")
const router = express.Router()
const puppeteer = require("puppeteer")

router.post("/create", async (req, res, next) => {
    const { tweetId } = req.query
    const twitterURL = "https://twitter.com/anyuser/status/"
    let browser
    let page

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-notifications"],
        })

        page = await browser.newPage()

        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        )

        await page.goto(twitterURL + tweetId, { waitUntil: "networkidle0" })

        await page.waitForSelector('article[role="article"]')

        const tweet = await page.$('article[role="article"]')

        const tweetBodyText = await page.$('article[role="article"] div[lang="en"]')

        console.log(tweetBodyText, "THE TWEET")

        res.json({
            data: "Success",
            error: false,
        })
    } catch (err) {
        console.log(err)
    } finally {
        await browser.close()
    }
})

module.exports = router
