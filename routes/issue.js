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

  router.get('/getVisitIssues/:id', async (req, res) => {
    const { id } = req.params;
    const result = await mySQLService.getVisitIssuesBeforeSort(id);

    if(!result.length) {
      res.status(200).json({ success: 0, issues: [] });
    }

    res.status(200).json({ success: 1, issues: result });
  });

  router.patch('/updateStartEndSpecialist/:id', async (req, res) => {
    const result = await mySQLService.updateStartEndSpecialist(req.params.id, req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error editing issue' });
    }

    res.status(200).json({ success: 1, message: 'Issue was succefully edited' });
  });

  router.get('/getSortedIssues/:id', async (req, res) => {
    const result = await mySQLService.getSortedissues(req.params.id);

    if(!result.length) {
      res.status(200).json({ success: 0, issues: [] });
    }

    res.status(200).json({ success: 1, issues: result });
  });

  router.patch('/editDependency/:id', async (req, res) => {
    const { id } = req.params;

    const result = await mySQLService.setDependency(id, req.body);
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error setting dependency' })
    }

    res.status(200).json({ success: 1, message: 'Successfully set dependency' });
  });

  router.patch('/setSequence', async (req, res) => {
    const array = JSON.parse(JSON.stringify(req.body));
    const result = await mySQLService.setIssueSequence(array);
    if(!result) {
      res.status(200).json({ success: 0, message: 'Error setting sequence' })
    }

    res.status(200).json({ success: 1, message: 'Successfully set sequence' });
  });

  router.post('/addIssue', async (req, res) => {
    const result = await mySQLService.addIssue(req.body);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error issue creating' });
    }

    res.status(200).json({ success: 1, message: 'Successfully created issue' });
  });

  router.delete('/deleteIssue/:id', async (req, res) => {
    const result = await mySQLService.deleteIssue(req.params.id);

    if(!result) {
      res.status(400).json({ success: 0, message: 'Error deleting issue' })
    }

    res.status(200).json({ success: 1, message: 'Successfully deleted issue' });
  });

  router.patch('/closeIssue/:id', async (req, res) => {
    const result = await mySQLService.closeIssue(req.params.id);
    
    if(!result) {
      res.status(400).json({ success: 0, message: 'Error closing issue' })
    }

    res.status(200).json({ success: 1, message: 'Successfully closed issue' });
  });

  router.get('/issueTypes', async (req, res) => {
    const result = await mySQLService.getProblemTypes();
   
    if(!result.length) {
      res.status(200).json({ success: 0, problems: [] });
    }

    res.status(200).json({ success: 1, problems: result });
  });

  return router;
};
