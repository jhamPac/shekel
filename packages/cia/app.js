require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy
const session = require("express-session")

// app
var app = express()

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET,
            callbackURL: "/auth/twitter/redirect",
        },
        () => {
            console.log("something happened")
        }
    )
)

app.use(passport.initialize())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:9000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
)

// routes
const blocksRouter = require("./routes/blocks")
const assetsRouter = require("./routes/assets")
const accountsRouter = require("./routes/accounts")
const twitterRouter = require("./routes/twitter")
const authRouter = require("./routes/auth")

app.use("/api/v1/blocks", blocksRouter)
app.use("/api/v1/assets", assetsRouter)
app.use("/api/v1/accounts", accountsRouter)
app.use("/api/v1/twitter", twitterRouter)
app.use("/api/v1/auth", authRouter)

module.exports = app
