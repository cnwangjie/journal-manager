const Router = require('koa-router')

const {Journal} = require('../models')

const router = module.exports = new Router({ prefix: '/journal' })

router.get('/', async ctx => {
  const {name} = ctx.request.query
  if (name) {

  }
  const journals = await Journal.find().exec()
  return journals
})

router.put('/', ctx => {

})
