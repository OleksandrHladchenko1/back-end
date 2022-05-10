const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.post('/addSpecialist', async (req, res) => {
    const result = await mySQLService.addSpecialist(req.body);
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error creating specialist' });
    }
    res.status(200).json({ success: 1,message: 'Specialist was succefully created' });
  });

  router.delete('/deleteSpecialist/:id_worker/:id_speciality', async (req, res) => {
    const result = await mySQLService.deleteSpecialist(req.params.id_worker, req.params.id_speciality);
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error deelting specialist' });
    }

    res.status(200).json({ success: 1, message: 'Specialist was succefully deleted' });
  });

  router.patch('/editSpecialist', async (req, res) => {
    const result = await mySQLService.editSpecialist(req.body);
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error editing specialist' });
    }

    res.status(200).json({ success: 1, message: 'Specialist was succefully edited' });
  });

  return router;
};
