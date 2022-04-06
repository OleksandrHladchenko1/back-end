const router = require('express').Router();

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();

  router.get('/getIssuesByVisitId/:id', async (req, res) => {
    const { id } = req.params;

    const result = await mySQLService.getIssuesByVisitId(id);

    if(!result.length) {
      res.status(400).json({ success: 0, message: 'No issues found' })
    }

    res.status(200).json({ success: 1, issues: result })
  });

  return router;
};
