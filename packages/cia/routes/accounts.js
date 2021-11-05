const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")

router.get("/:stakeAddress/addresses/assets", async (req, res) => {
    const { stakeAddress } = req.params
    try {
        const results = await cardano.accountsAddressesAssets(stakeAddress)

        let xs = []
        results.forEach(async r => {
            xs.push(cardano.assetsById(r.unit))
        })

        const zs = await Promise.all(xs)

        res.json({
            data: zs,
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
