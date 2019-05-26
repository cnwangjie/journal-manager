const Router = require('koa-router')

const {Subscription, Inventory} = require('../models')

const router = module.exports = new Router({ prefix: '/subscription' })

router.get('/', async ctx => {
  const {journal_id, year} = ctx.request.query
  if (journal_id) return ctx.body = await Subscription.find({journal_id})
  if (year) return ctx.body = await Subscription.find({year})
  ctx.body = await Subscription.find()
})

router.put('/', async ctx => {
  const {journal_id, year} = ctx.request.body
  const subscription = await Subscription.findOneAndUpdate({journal_id, year}, {journal_id, year}, {new: true, upsert: true, useFindAndModify: false})
  ctx.body = subscription
})

router.put('/:_id/stock', async ctx => {
  const {_id} = ctx.params
  const {year, season, phase} = ctx.request.body
  const subscription = await Subscription.findById(_id)
  const {journal_id} = subscription
  const inventory = await Inventory.findOneAndUpdate({journal_id, phase}, {journal_id, year, season, phase}, {new: true, upsert: true, useFindAndModify: false})
  ctx.body = inventory
})

router.delete('/:_id', async ctx => {
  const {_id} = ctx.params
  const subscription = await Subscription.findByIdAndDelete(_id, {useFindAndModify: false})
  ctx.body = subscription
})
