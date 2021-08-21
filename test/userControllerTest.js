const { expect } = require('chai')
const request = require('supertest')
const Role = require('../authorize/role');

const app = require('../app')

describe('AttainU mock authentication', () => {
  const loginDetails = { username: 'test', password: 'test_123', role: Role.User }
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
    it('it should get posts when username and password are correctly provided', (done) => {
      request.agent(app)
        .get('/users/post')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('it should fail to create a post when user is not admin', (done) => {
      request.agent(app)
        .post('/users/post')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
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