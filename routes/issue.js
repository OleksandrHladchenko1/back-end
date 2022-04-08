const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/getIssuesByVisitId/:id/:status', async (req, res) => {
    const { id, status } = req.params;

    const result = await mySQLService.getIssuesByVisitId(id, status);

    if(!result.length) {
      res.status(200).json({ success: 0, issues: [] });
    }

    res.status(200).json({ success: 1, issues: result });
  });

  router.post('/addIssue', async (req, res) => {
    const result = await mySQLService.addIssue(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error issue creating' });
    }

    res.status(200).json({ success: 1, message: 'Successfully created issue' });
  });

  return router;
};
