const Router = require('koa-router')

const {Paper, Keyword} = require('../models')

const router = module.exports = new Router({ prefix: '/paper' })

router.get('/', async ctx => {
  const {inventory_id, phase, title, author, keyword} = ctx.params
  if (inventory_id) return ctx.body = await Paper.find({inventory_id})
  if (title) return ctx.body = await Paper.findOne({title})
  if (author) return ctx.body = await Paper.find({author: new RegExp(author)})
  if (keyword) {
    const kw = await Keyword.findOne({name: keyword})
    if (!kw) return ctx.body = []
    return ctx.body = await Paper.find({keywords: {$all: [kw._id]}})
  }
  ctx.body = await Paper.find()
})

router.put('/', async ctx => {
  const {inventory_id, title, author, page, keywords} = ctx.request.body
  const kws = await Promise.all(keywords.map(async keyword => {
    return await Keyword.findOneAndUpdate({name: keyword}, {name: keyword}, {upsert: true, useFindAndModify: false})
  }))
  const paper = await Paper.findOneAndUpdate({inventory_id, title}, {inventory_id, title, author, page, keywords: kws.map(({_id}) => _id)}, {new: true, upsert: true, useFindAndModify: false})
  ctx.body = paper
})

router.get('/:_id', async ctx => {
  const {_id} = ctx.params
  ctx.body = await Paper.findById(_id)
})

router.delete('/:_id', async ctx => {
  const {_id} = ctx.params
  ctx.body = await Paper.findByIdAndDelete(_id)
})
