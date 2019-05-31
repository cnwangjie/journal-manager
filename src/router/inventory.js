const Router = require('koa-router')

const {Inventory} = require('../models')

const router = module.exports = new Router({ prefix: '/inventory' })

router.get('/', async ctx => {
  const {journal_id, year} = ctx.request.query
  if (journal_id) return ctx.body = await Inventory.find({journal_id})
  if (year) return ctx.body = await Inventory.find({year})
  ctx.body = await Inventory.find()
})

router.delete('/:_id', async ctx => {
  const {_id} = ctx.params
  ctx.body = await Inventory.findByIdAndDelete(_id)
})

router.put('/:_id/borrow', async ctx => {
  const {_id} = ctx.params
  const {borrower_id} = ctx.request.body
  ctx.body = await Inventory.findByIdAndUpdate(_id, {borrower_id}, {new: true, useFindAndModify: false})
})

router.put('/:_id/return', async ctx => {
  const {_id} = ctx.params
  ctx.body = await Inventory.findByIdAndUpdate(_id, {borrower_id: null}, {new: true, omitUndefined: true})
})
