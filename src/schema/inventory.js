const {Schema, SchemaTypes} = require('mongoose')

const inventorySchema = module.exports = new Schema({
  journal_id: SchemaTypes.ObjectId,
  year: Number,
  season: Number,
  borrower_id: SchemaTypes.ObjectId,
})
