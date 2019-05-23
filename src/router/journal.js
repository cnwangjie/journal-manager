const Router = require('koa-router')

const {Journal} = require('../models')

const router = module.exports = new Router({ prefix: '/journal' })

router.get('/', async ctx => {
  const {name, cn} = ctx.request.query
  if (name) return ctx.body = await Journal.findOne({name})
  if (cn) return ctx.body = await Journal.findOne({cn})
  ctx.body = await Journal.find()
})

router.put('/', async ctx => {
  const {name, sponsor, cn, location, issn, code, period} = ctx.request.body
  const journal = await Journal.findOneAndUpdate({cn}, {name, sponsor, cn, location, issn, code, period}, {new: true, upsert: true})
  ctx.body = journal
})

router.delete('/:_id', async ctx => {
  const {_id} = ctx.params
  await Journal.findOneByIdAndDelete(_id)
  ctx.body = 'ok'
})
