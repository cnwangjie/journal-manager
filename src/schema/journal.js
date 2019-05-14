const {Schema} = require('mongoose')

const journalSchema = module.exports = new Schema({
  name: String,
  sponsor: String,
  cn: String,
  location: String,
  issn: String,
  code: String,
  period: String,
})
