var { BlockFrostAPI } = require('@blockfrost/blockfrost-js')
const cardano = new BlockFrostAPI({
    projectId: process.env.BLOCKFROST_API,
})

module.exports = cardano
