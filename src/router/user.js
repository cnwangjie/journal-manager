const Router = require('koa-router')

const {User} = require('../models')

const router = module.exports = new Router({ prefix: '/user' })

router.get('/', async ctx => {
  ctx.body = await User.find()
})

router.get('/:_id', async ctx => {
  const {_id} = ctx.params
  ctx.body = await User.findById(_id)
})
