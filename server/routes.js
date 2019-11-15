const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const router = express.Router()

const requireUser = async (req, res, next) => {
  const token = req.get("Authorization")
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY || "secret key")
      if (decoded.userId) {
        const user = await User.findOne({ _id: decoded.userId })
        if (user) {
          res.locals.user = user
          return next()
        }
      }
    } catch (e) {
      console.log(e)
      res.status(401).json({ error: "Invalid authorization token" })
    }
  }

  res.status(401).json({ error: "Not authorized" })
}

router.get("/api/something", requireUser, (req, res) => {
  res.json({ status: "OK" })
})

router.get("/auth/github", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`)
})

router.post("/auth/github/token", async (req, res, next) => {
  try {
    // obtener el código
    const code = req.body.code

    // obtener el access token de Github
    const r1 = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, { headers: { "Accept": "application/json" } })
    const accessToken = r1.data.access_token

    // obtener el email de la persona
    const r2 = await axios.get("https://api.github.com/user/emails?access_token=" + accessToken)
    const email = r2.data.find(g => g.primary).email

    // obtener o crear el usuario en la base de datos
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, password: Math.random().toString(36).substring(9) })
    }

    // devolvemos un JWT (JSON Web Token)
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY || "secret key");
    res.json({ token })
  } catch (e) {
    next(e)
  }
})

router.get("/auth/github/mobile", () => {
  res.redirect(`https://auth.expo.io/@germanescobar/github?code=${req.query.code}`)
})

module.exports = router
