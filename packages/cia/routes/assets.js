const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")

router.get("/:asset/addresses", async (req, res, next) => {
    const { asset } = req.params
    try {
        const result = await cardano.assetsAddresses(asset)
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

router.get("/:asset/history", async (req, res, next) => {
    const { asset } = req.params
    try {
        const result = await cardano.assetsHistory(asset)
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

router.get("/:asset/transactions", async (req, res) => {
    const { asset } = req.params
    try {
        const result = await cardano.assetsTransactions(asset)
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

router.get("/:asset", async (req, res, next) => {
    const { asset } = req.params
    try {
        const result = await cardano.assetsById(asset)
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
