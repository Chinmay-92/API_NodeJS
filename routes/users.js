const express = require('express')
const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken')
const authorize = require('../authorize/authorize')
const Role = require('../authorize/role');

const router = express.Router()

router.post('/login', userController.user_login)
router.get('/post', verifyToken, (req, res) => {
  res.send('get post API response');
});
router.post('/post', verifyAdminToken, (req, res) => {
  res.status(200).send('dummy post is created');
});

function verifyAdminToken(req, res, next) {
  const { token } = req.headers
  if (!token) {
    return res.status(403).json({ authorized: false, error: 'Admin Token is required.' })
  }
  // Verify token
  jwt.verify(token, "DUMMY_ADMIN_JWT_SECRET", (err, decoded) => {
    if (err) { return res.status(401).send({ authorized: false, error: 'Verification failed or token has expired.' }) }
    req.user = decoded
    next()
  })
}

function verifyToken(req, res, next) {
  const { token } = req.headers
  if (!token) {
    return res.status(403).json({ authorized: false, error: 'Token is required.' })
  }
  // Verify token
  jwt.verify(token, "DUMMY_JWT_SECRET", (err, decoded) => {
    if (err) { return res.status(401).send({ authorized: false, error: 'Verification failed or token has expired.' }) }
    req.user = decoded
    next()
  })
}

module.exports = router