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
  const subscription = await Subscription.findOneAndUpdate({journal_id, year}, {journal_id, year}, {new: true, upsert: true})
  ctx.body = subscription
})

router.put('/:_id/stock', async ctx => {
  const {_id} = ctx.params
  const {season} = ctx.request.body
  const subscription = await Subscription.findById(_id)
  const {journal_id} = subscription
  const inventory = await Inventory.create({journal_id, season})
  ctx.body = inventory
})

router.delete('/:_id', async ctx => {
  const {_id} = ctx.params
  const subscription = await Subscription.findByIdAndDelete(_id)
  ctx.body = subscription
})
