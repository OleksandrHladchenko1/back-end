const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.post('/createWorker', async (req, res) => {
    const result = await mySQLService.createWorker(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error creating workers' });
    }

    res.status(200).json({ success: 1,message: 'Worker was succefully created' });
  });

  router.get('/getAllWorkers', async (req, res) => {
    const result = await mySQLService.getWorkers();

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers' });
    }

    res.status(200).json({ success: 1, workers: result });
  });

  router.get('/getWorkerById/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.getWorkersById(workerId);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting worker by id' });
    }

    res.status(200).json({ success: 1, worker: result });
  });

  router.get('/getFullWorkerInfo', async (req, res) => {
    const result = await mySQLService.getFullWorkersInfo();

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers full info' });
    }

    res.status(200).json({ success: 1, workers: result });
  });

  router.get('/getFullWorkerInfoById/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.getFullWorkerInfoById(workerId);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers full info by id' });
    }

    res.status(200).json({ success: 1, worker: result });
  });

  router.patch('/editWorker/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.editWorker(req.body, workerId);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error editing workers' });
    }

    res.status(200).json({ success: 1, message: 'Worker was succefully edited' });
  });

  router.delete('/deleteWorker/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.deleteWorker(workerId);
    
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error deleting worker' });
    }

    res.status(200).json({ success: 1, message: 'Successful deleted worker' });
  });

  return router;
};