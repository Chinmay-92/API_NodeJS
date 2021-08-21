const express = require("express")
const bodyParser = require('body-parser')
const users = require('./routes/users')

const app = express();

app.use(bodyParser.json());

app.use('/users', users)

app.get("/", (req, res, next) => {

  res.json({ message: "from app js api" });

});

module.exports = app