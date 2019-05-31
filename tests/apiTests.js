const {expect} = require('chai')
const request = require('supertest')
const app = require('../src/app')
const {Journal} = require('../src/models')

const server = app.listen(30000)

describe('subscription', () => {
  describe('GET /subscription', () => {
    it('should return an array', async () => {
      const res = await request(server).get('/subscription').expect(200)
      expect(res.body).to.be.an('array')
    })

    it('should return an object when request with an id', async () => {
      const journal = await Journal.findOne()
      const res = await request(server).get('/subscription?journal_id=' + journal._id).expect(200)
      expect(res.body).to.be.an('array')
      res.body.forEach(i => {
        expect(i.journal_id).equal(journal._id.toString())
      })
    })
  })
})
