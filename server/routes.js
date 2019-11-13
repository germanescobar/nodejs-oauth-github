const express = require('express')
const router = express.Router()

router.get("/api/something", (req, res) => {
  res.json({ status: "OK" })
})

module.exports = router
