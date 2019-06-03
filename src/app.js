const path = require('path')

const Koa = require('koa')
const render = require('koa-ejs')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')

const inventoryRouter = require('./router/inventory')
const journalRouter = require('./router/journal')
const keywordRouter = require('./router/keyword')
const paperRouter = require('./router/paper')
const subscriptionRouter = require('./router/subscription')
const userRouter = require('./router/user')

const MONGODB = process.env.MONGODB || 'mongodb://127.0.0.1:27017/jm'

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
})

const app = module.exports = new Koa()

app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', '*')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  if (ctx.method === 'OPTIONS') ctx.status = 200
  else await next()
})

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
app.use(userRouter.routes())
