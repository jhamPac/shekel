var express = require("express")
var router = express.Router()
const cardano = require("../cardano/cardano.js")

router.get("/tip", async (req, res, next) => {
    try {
        const result = await cardano.blocksLatest()
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
