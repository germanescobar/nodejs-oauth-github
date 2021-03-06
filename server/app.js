require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require("mongoose")
const routes = require('./routes')

const app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oauth', { useNewUrlParser: true })

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../dist')))

require("./models/User");
app.use('/', routes)

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  console.log("*** Development Mode ***")

  const fallback = require('connect-history-api-fallback')
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')

  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(fallback({ verbose: false }))

  app.use(webpackDevMiddleware(compiler))
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })
}

module.exports.app = app;
