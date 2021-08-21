const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')

describe('AttainU mock authentication', () => {
  const loginDetails = { username: 'test', password: 'test_123' }
  let token

  describe('Mock Authentication', () => {
    it('it should log user in if username and password are provided', (done) => {
      request.agent(app)
        .post('/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('it should return a JWT after login', (done) => {
      request.agent(app)
        .post('/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.authorized).to.equal(true)
          token = res.body.token
          done()
        })
    })
  })

  describe('CRUD', () => {
    it('it should create a post when username and password are correctly provided', (done) => {
      request.agent(app)
        .post('/users/post')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('it should fail to create a post when username and password are invalid', (done) => {
      request.agent(app)
        .post('/users/post')
        .set('token', token + 'invalid')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          done()
        })
    })
  })

})