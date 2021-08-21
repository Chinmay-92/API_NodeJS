const jwt = require('jsonwebtoken')
require('dotenv').load()

exports.user_login = [

  (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password
    const token = jwt.sign({ username: username }, "DUMMY_JWT_SECRET",
      { expiresIn: 3600 })
    req.headers['token'] = token
    res.status(200).send({ user: username, authorized: true, token: token })
  }
]