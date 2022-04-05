const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/me/:userId', async (req, res) => {
    const { userId } = req.params;

    const user = await mySQLService.getUserById(userId);

    res.status(200).json({ success: 1, user });
  });

  router.patch('/updateInfo', async (req, res) => {
    const result = await mySQLService.updateUserInfo(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error updating user' })
    }

    res.status(200).json({ success: 1, message: 'Successfully updated user' });
  });

  return router;
}