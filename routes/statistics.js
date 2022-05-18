const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/workload', async (req, res) => {
    const result = await mySQLService.getWorkload();

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No cars found' })
    }

    res.status(200).json({ success: 1, workload: result })
  });

  return router;
};
