const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/me/:userId', async (req, res) => {
    const { userId } = req.params;

    const user = await mySQLService.getUserById(userId);

    res.status(200).json({ success: 1, user });
  });

  return router;
}