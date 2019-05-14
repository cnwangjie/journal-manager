const {Schema, SchemaTypes} = require('mongoose')

const paperSchema = module.exports = new Schema({
  inventory_id: SchemaTypes.ObjectId,
  title: String,
  author: String,
  page: String,
  keywords: [SchemaTypes.ObjectId],
})
