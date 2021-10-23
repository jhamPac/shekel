require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// app
var app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routes
var blocksRouter = require('./routes/blocks')
app.use('/api/v1/blocks', blocksRouter)

module.exports = app
