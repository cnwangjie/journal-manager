const path = require('path')

const Koa = require('koa')
const render = require('koa-ejs')
const mongoose = require('mongoose')

const inventoryRouter = require('./router/inventory')
const journalRouter = require('./router/journal')
const keywordRouter = require('./router/keyword')
const paperRouter = require('./router/paper')
const subscriptionRouter = require('./router/subscription')

mongoose.connect('mongodb://127.0.0.1:27017/jm', {
  useNewUrlParser: true,
})

const app = module.exports = new Koa()

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
})

app.use(inventoryRouter.routes())
app.use(journalRouter.routes())
app.use(keywordRouter.routes())
app.use(paperRouter.routes())
app.use(subscriptionRouter.routes())

require('../migrations/20190514')
