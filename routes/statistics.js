const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/workload', async (req, res) => {
    const result = await mySQLService.getWorkload();

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No workload found' });
    }

    res.status(200).json({ success: 1, workload: result });
  });

  router.get('/problems', async (req, res) => {
    const result = await mySQLService.getProblemStatistics();
    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No statistics found' });
    }

    res.status(200).json({ success: 1, problems: result });
  });

  return router;
};
