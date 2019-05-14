const { model } = require('mongoose')

const inventorySchema = require('./schema/inventory')
const journalSchema = require('./schema/journal')
const keywordSchema = require('./schema/keyword')
const paperSchema = require('./schema/paper')
const subscriptionSchema = require('./schema/subscription')
const userSchema = require('./schema/user')

const models = module.exports = {}

models.Inventory = model('inventory', inventorySchema)
models.Journal = model('journal', journalSchema)
models.Keyword = model('keyword', keywordSchema)
models.Paper = model('paper', paperSchema)
models.Subscription = model('subscription', subscriptionSchema)
models.User = model('user', userSchema)
