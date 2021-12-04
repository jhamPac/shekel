require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-session")
const logger = require("morgan")
const cors = require("cors")
const passport = require("./passport/setup.js")
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// app
const app = express()

app.use(
    cookieSession({
        name: "session",
        keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
        maxAge: 24 * 60 * 60 * 100,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
