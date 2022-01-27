const router = require('express').Router();
const { checkToken } = require('../services/token_validation');

const authRoute = require('./auth');

module.exports = () => {
  router.use('/auth', authRoute());

  return router;
}; 