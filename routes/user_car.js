const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/allUserCars/:id', async (req, res) => {
    const { id } = req.params;

    const result = await mySQLService.findUserCars(id);

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No cars found' })
    }

    res.status(200).json({ success: 1, cars: result })
  });

  router.post('/addUserCar', async (req, res) => {
    const result = await mySQLService.addUserCar(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error adding car' });
    }

    res.status(200).json({ success: 1, message: 'Successfully added car' });
  });

  router.patch('/editUserCar/:carId', async (req, res) => {
    const { carId } = req.params;
    const result = await mySQLService.updateUserCar(carId, req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error updating' });
    }

    res.status(200).json({ success: 1, message: 'Successfully updated car' });
  });

  router.delete('/deleteUserCar/:carId', async (req, res) => {
    const { carId } = req.params;
    const result = await mySQLService.deleteUserCar(carId);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error deleting' });
    }

    res.status(200).json({ success: 1, message: 'Successful deleted car' });
  });

  router.get('/getCount/:id', async (req, res) => {
    const { id } = req.params;
    const result = await mySQLService.countUserCars(id);

    if(!result?.carAmount) {
      res.status(400).json({ success: 0, message: 'No cars found' })
    }

    res.status(200).json({ success: 1, amount: result })
  });

  return router;
};