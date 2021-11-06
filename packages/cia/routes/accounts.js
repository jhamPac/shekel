const express = require("express")
const router = express.Router()
const cardano = require("../cardano/cardano.js")

const convertIPFSURL = url => {
    path = pluckIPFSpath(url)
    return "https://ipfs.io/ipfs/" + path
}

const pluckIPFSpath = url => url.replace(/ipfs/g, "/").split("/").slice(-1)[0]
const createAssetUIData = (a, c) => {
    const { image, files, ...x } = c
    const z = {
        ...x,
        imageURL: convertIPFSprotocol(image),
    }
    return a.concat(z)
}

router.get("/:stakeAddress/addresses/assets", async (req, res) => {
    const { stakeAddress } = req.params

    try {
        const results = await cardano.accountsAddressesAssets(stakeAddress)

        let xs = []
        results.forEach(async r => {
            xs.push(cardano.assetsById(r.unit))
        })

        const ys = await Promise.all(xs)

        const zs = ys.map(d => d.onchain_metadata).reduce()

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
