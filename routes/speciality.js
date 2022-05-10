const router = require('express').Router();
const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/getAll', async (req, res) => {
    let specialities = await mySQLService.getAllSpecialities();

    if(!specialities.length) {
      res.status(400).json({ success: 0, message: 'No specialities found' })
    }

    res.status(200).json({ success: 1, specialities })
  });

  return router;
};
