const {Schema, SchemaTypes} = require('mongoose')

const userSchema = module.exports = new Schema({
  name: String,
})
