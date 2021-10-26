const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")
/* GET home page. */
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
