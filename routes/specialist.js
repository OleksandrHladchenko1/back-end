const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.patch('/editSpecialist', async (req, res) => {
    const result = await mySQLService.editSpecialist(req.body);
    console.log('-----inside-----');
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error editing specialist' });
    }

    res.status(200).json({ success: 1, message: 'Specialist was succefully edited' });
  });

  return router;
};
