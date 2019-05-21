const Router = require('koa-router')

const {Journal} = require('../models')

const router = module.exports = new Router({ prefix: '/journal' })

router.get('/', async ctx => {
  const {name, cn} = ctx.request.query
  if (name) return ctx.body = await Journal.findOne({name})
  if (cn) return ctx.body = await Journal.findOne({cn})
  ctx.body = await Journal.find()
})

router.put('/', ctx => {

})
