const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")

router.get("/:stakeAddress/addresses/assets", async (req, res) => {
    const { stakeAddress } = req.params
    try {
        const result = await cardano.accountsAddressesAssets(stakeAddress)
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
