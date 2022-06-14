const router = require('express').Router();
const { checkToken } = require('../services/token_validation');

const authRoute = require('./auth');
const userVisitsRoute = require('./user_visit');
const userCarsRoute = require('./user_car');
const workerRoute = require('./worker');
const userRoute = require('./user');
const issueRoute = require('./issue');
const specialistRoute = require('./specialist');
const specialityRoute = require('./speciality');
const documentRoute = require('./document');
const statisticsRoute = require('./statistics');

module.exports = () => {
  router.use('/auth', authRoute()); 
  router.use('/userVisits', checkToken, userVisitsRoute());
  router.use('/userCars', checkToken, userCarsRoute());
  router.use('/workers', workerRoute());
  router.use('/users', checkToken, userRoute());
  router.use('/issue', checkToken, issueRoute());
  router.use('/specialist', checkToken, specialistRoute());
  router.use('/speciality', checkToken, specialityRoute());
  router.use('/document', checkToken, documentRoute());
  router.use('/statistics', checkToken, statisticsRoute());

  return router;
}; 