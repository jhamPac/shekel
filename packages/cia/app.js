require("dotenv").config()
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")

// app
var app = express()
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:9000",
    })
)

// routes
const blocksRouter = require("./routes/blocks")
const assetsRouter = require("./routes/assets")
const accountsRouter = require("./routes/accounts")

app.use("/api/v1/blocks", blocksRouter)
app.use("/api/v1/assets", assetsRouter)
app.use("/api/v1/accounts", accountsRouter)

module.exports = app
