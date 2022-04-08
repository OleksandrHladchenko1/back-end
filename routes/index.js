const router = require('express').Router();
const { checkToken } = require('../services/token_validation');

const authRoute = require('./auth');
const userVisitsRoute = require('./user_visit');
const userCarsRoute = require('./user_car');
const workerRoute = require('./worker');
const userRoute = require('./user');
const issueRoute = require('./issue');
const specialistRoute = require('./specialist');

module.exports = () => {
  router.use('/auth', authRoute()); 
  router.use('/userVisits', checkToken, userVisitsRoute());
  router.use('/userCars', checkToken, userCarsRoute());
  router.use('/workers', checkToken, workerRoute());
  router.use('/users', checkToken, userRoute());
  router.use('/issue', checkToken, issueRoute());
  router.use('/specialist', checkToken, specialistRoute());

  return router;
}; 