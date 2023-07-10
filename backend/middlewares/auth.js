const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('../utils/Errors');
const {jwtToken} = require("../utils/jwtToken");

module.exports = (req, res, next) => {
  const tokenCookie = req.cookies.jwt;
  const {authorization} = req.headers;

  if (!tokenCookie && !(authorization && authorization.startsWith('Bearer '))) {
    next(new AuthError());
    return;
  }

  const token = tokenCookie || authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, jwtToken);
  } catch (err) {
    next(new AuthError());
  }

  next();
};
