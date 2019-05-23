const Router = require('koa-router')

const {Keyword} = require('../models')

const router = module.exports = new Router({ prefix: '/keyword' })

router.get('/', async ctx => {
  ctx.body = await Keyword.find()
})