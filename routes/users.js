const express = require('express')
const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', userController.user_login)
router.post('/post', verifyToken, (req, res) => {
  res.send('dummy post is created');
});

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