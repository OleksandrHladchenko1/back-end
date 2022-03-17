const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/allUserVisits', async (req, res) => {
    const { userId, status } = req.body;

    const result = await mySQLService.findUserVisits(userId, status);

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

  return router;
};