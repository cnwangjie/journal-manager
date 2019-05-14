const {Schema, SchemaTypes} = require('mongoose')

const subscriptionSchema = module.exports = new Schema({
  journal_id: SchemaTypes.ObjectId,
  year: Number,
})
