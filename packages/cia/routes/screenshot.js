const path = require("path")
const { exec } = require("child_process")
const express = require("express")
const router = express.Router()
const puppeteer = require("puppeteer")

router.post("/create", async (req, res, next) => {
    const { tweetId } = req.query
    const twitterURL = "https://twitter.com/anyuser/status/"
    let browser
    let page

    try {
        // set up a headless browser
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-notifications"],
        })

        // creates a tab
        page = await browser.newPage()

        // setting this to Chrome is important, the default is HeadlessChrome which will be blocked
        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        )

        // navigate to URL
        await page.goto(twitterURL + tweetId, { waitUntil: "networkidle0" })

        // tweets are wrapped an article element
        await page.waitForSelector('article[role="article"]')

        // grab the tweet
        const tweet = await page.$('article[role="article"]')

        // take the screenshot
        await tweet.screenshot({ path: path.join(__dirname, "test.png") })

        // compress the image
        exec(
            `squoosh-cli -d ${path.join(
                __dirname,
                "../compressed"
            )} --mozjpeg 90 -s _compressed ${path.join(__dirname, "test.png")}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`)
                }

                if (stderr) {
                    console.log(`stderr: ${stderr}`)
                }

                console.log(`stdout: ${stdout}`)
            }
        )

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
