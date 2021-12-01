require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const passport = require("./passport/setup.js")
const session = require("express-session")

// app
const app = express()

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
