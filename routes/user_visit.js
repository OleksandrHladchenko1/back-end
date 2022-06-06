const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/allUserVisits', async (req, res) => {
    const result = await mySQLService.findAllVisits();

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No visits found' })
    }

    res.status(200).json({ success: 1, visits: result })
  });

  router.get('/allUserVisits/:userId', async (req, res) => {
    const { userId } = req.params;

    const result = await mySQLService.findUserVisits(userId);

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No visits found' })
    }

    res.status(200).json({ success: 1, visits: result })
  });

  router.get('/getVisitById/:id', async (req, res) => {
    const { id } = req.params;
    
    const result = await mySQLService.getVisitById(id);

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No visit found' })
    }

    res.status(200).json({ success: 1, visit: result })
  });

  router.patch('/updateVisitStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await mySQLService.changeVisitStatus(id, status);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error updating visit' })
    }

    res.status(200).json({ success: 1, message: 'Successfully updated visit' })
  });

  router.post('/addUserVisit/:userId', async (req, res) => {
    const { userId } = req.params;

    const result = await mySQLService.createUserVisit(userId, req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error visit creating' });
    }

    res.status(200).json({ success: 1, message: 'Successfully created visit' });
  });

  router.get('/getFreeVisits/:day', async (req, res) => {
    const date = new Date();
    const times = [
      '08:00', '08:30', '09:00',
      '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00',
      '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00',
      '15:30', '16:00', '16:30',
      '17:00',
    ];
    const freeTimes = [];
    for(let i = 0; i < times.length; i++) {
      const result = await mySQLService.getFreeVisits(`${req.params.day} ${times[i]}:00`);
      if(result < 2) {
        freeTimes.push({ time: times[i] });
      }
    }
    if(!freeTimes.length) {
      res.status(400).json({ success: 0, message: 'No visits found' })
    }

    res.status(200).json({ success: 1, visit: freeTimes })
  });

  router.delete('/deleteVisit/:id', async (req, res) => {
    const result = await mySQLService.deleteVisit(req.params.id);
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error deleting visit' })
    }

    res.status(200).json({ success: 1, message: 'Successfully deleted visit' })
  });

  router.patch('/setSorted/:id', async (req, res) => {
    const result = await mySQLService.setSorted(req.params.id);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error set sorted visit' })
    }

    res.status(200).json({ success: 1, message: 'Successfully set sorted visit' })
  });

  return router;
};