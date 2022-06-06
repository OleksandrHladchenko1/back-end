const router = require('express').Router();
const bcrypt = require('bcrypt');

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.post('/createWorker', async (req, res) => {
    const { email, startStatus, password } = req.body;
    let worker = await mySQLService.findUser(email, startStatus);
  
    if (worker) {
      res.status(400).json({ success: 0, message: 'User with this email already exists' });
    } else {
      const cryptedPassword = await bcrypt.hash(password, 10);
      const result = await mySQLService.createWorker({ ...req.body, password: cryptedPassword });

      if(!result) {
        res.status(400).json({ success: 0, message: 'Error creating workers' });
      }
      res.status(200).json({ success: 1,message: 'Worker was succefully created' });
    }
  });

  router.get('/getAllWorkers', async (req, res) => {
    const result = await mySQLService.getWorkers();

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers' });
    }

    res.status(200).json({ success: 1, workers: result });
  });

  router.get('/getWorkerById/:id', async (req, res) => {
    const { id } = req.params;
    const result = await mySQLService.getWorkersById(id);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting worker by email' });
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

  router.get('/getFullFreeWorkerInfo/:start/:end', async (req, res) => {
    if(req.params.start === 'null' || req.params.end === 'null') {
      return res.status(200).json({ success: 1, workers: [] });
    }
    const result = await mySQLService.getFullFreeWorkersInfo(req.params.start, req.params.end);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting free workers full info' });
    }

    res.status(200).json({ success: 1, workers: result });
  });

  router.get('/getFreeWorkersForProblem/:id', async (req, res) => {
    const result = await mySQLService.getFreeWorkersForProblem(req.params.id);

    if(!result) {
      res.status(400).json({ success: 0, workers: [] });
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

  router.get('/getWorkerInfoById/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.getWorkerInfoById(workerId);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers info by id' });
    }

    res.status(200).json({ success: 1, worker: result });
  });

  router.get('/getWorkerSpecialities/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const result = await mySQLService.getWorkerSpecialities(workerId);
    
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error getting workers specialities' });
    }

    res.status(200).json({ success: 1, specialities: result });
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