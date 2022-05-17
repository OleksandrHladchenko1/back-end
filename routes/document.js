const router = require('express').Router();
const fs = require('fs');
const { createPDFDoc } = require('../services/createPDF');
const pdf = require('html-pdf');
const pdfTemplate = require('../utils/documentTemplate');

module.exports = () => {
  router.post('/create', async (req, res) => {
    pdf.create(pdfTemplate(req.body.state), {}).toFile(`${__dirname}/result.pdf`, (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  });

  router.get('/fetch', async (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
  });

  return router;
};
