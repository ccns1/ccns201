const path = require('path')
const Koa = require('koa')
const static = require('koa-static')
const router = require('./router/index')

const app = new Koa()

app.use(static(path.resolve(__dirname, './client')))
app.use(router.routes())

module.exports = app
