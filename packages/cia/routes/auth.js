const express = require("express")
const router = express.Router()

router.post("/twitter", async (req, res) => {
    res.json({ msg: "Success" })
})

module.exports = router
