const Router = require('koa-router')

const router = module.exports = new Router({ prefix: '/inventory' })

router.get('/', ctx => {
  ctx.res.end('hi')
})

router.put('/', ctx => {

})
