const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('./Errors/AuthError');
const {jwtToken} = require("./jwtToken");

const getUserIdFromCookiesOrHeaders = (req, next) => {
  const tokenCookie = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!tokenCookie && !(authorization && authorization.startsWith('Bearer '))) {
    next(new AuthError());
    return;
  }

  const token = tokenCookie || authorization.replace('Bearer ', '');

  try {
    return jwt.verify(token, jwtToken);
  } catch (err) {
    next(new AuthError());
  }
};

module.exports = { getUserIdFromCookiesOrHeaders };
