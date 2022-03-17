const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/allUserCars', async (req, res) => {
    const { userId } = req.body;

    const result = await mySQLService.findUserCars(userId);

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No cars found' })
    }

    res.status(200).json({ success: 1, cars: result })
  });

  router.post('/addUserCar', async (req, res) => {
    const result = await mySQLService.addUserCar(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error adding' });
    }

    res.status(200).json({ success: 1, message: 'Successful added car' });
  });

  router.patch('/editUserCar/:carId', async (req, res) => {
    const { carId } = req.params;
    const result = await mySQLService.updateUserCar(carId, req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error updating' });
    }

    res.status(200).json({ success: 1, message: 'Successful updated car' });
  });

  return router;
};