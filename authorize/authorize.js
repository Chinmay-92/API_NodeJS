const jwt = require('express-jwt');
const { secret } = require('../config.json');

function authorize(role = []) {
  if (typeof role === 'string') {
    role = [role];
  }

  return [
    jwt({ secret, algorithms: ['HS256'] }),

    (req, res, next) => {
      if (role.length && !role.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    }
  ];
}

module.exports = authorize;
