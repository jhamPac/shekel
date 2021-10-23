var express = require('express')
var router = express.Router()
const cardano = require('../cardano/cardano.js')
/* GET home page. */
router.get('/tip', async (req, res, next) => {
    try {
        const latestBlock = await cardano.blocksLatest()
        res.json({
            data: [latestBlock],
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
