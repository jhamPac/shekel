const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")

router.get("/addresses", async (req, res) => {
    const { assetID } = req.query
    try {
        const result = await cardano.assetsAddresses(assetID)
        res.json({
            data: [result],
            error: false,
        })
    } catch (err) {
        res.json({
            data: [],
            error: true,
        })
    }
})

router.get("/history", async (req, res) => {
    const { assetID } = req.query
    try {
        const result = await cardano.assetsHistory(assetID)
        res.json({
            data: [result],
            error: false,
        })
    } catch (err) {
        res.json({
            data: [],
            error: true,
        })
    }
})

router.get("/transactions", async (req, res) => {
    const { assetID } = req.query
    try {
        const result = await cardano.assetsTransactions(assetID)
        res.json({
            data: [result],
            error: false,
        })
    } catch (err) {
        res.json({
            data: [],
            error: true,
        })
    }
})

router.get("/asset", async (req, res) => {
    const { assetID } = req.query
    try {
        const result = await cardano.assetsById(assetID)
        res.json({
            data: [result],
            error: false,
        })
    } catch (err) {
        res.json({
            data: [],
            error: true,
        })
    }
})

module.exports = router
