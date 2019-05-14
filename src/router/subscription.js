const Router = require('koa-router')

const {Subscription} = require('../models')

const router = module.exports = new Router({ prefix: '/subscription' })

router.get('/', async ctx => {
  const subscriptions = await Subscription.find({}).exec()
})

router.put('/', ctx => {

})

router.put('/:id/stock', ctx => {

})
