require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes');
const fs = require('fs');
const https = require('https');
const path = require('path');

const MySQLBackend = require('./services/MySQL');

app.use(cors());
app.use(express.json());
app.use('/api', routes());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '..', 'client')));

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'))
};
const port = process.env.APP_PORT || 3443;

const runMySQL = async () => {
  const mysqlBackend = new MySQLBackend();
  return mysqlBackend.max();
}

runMySQL();

https.createServer(httpsOptions, app).listen(port, () => console.log('Server up and working... on port ', port));

/* app.listen(port, () => {
  console.log('Server up and working... on port ', port);
}); */

module.exports = app;
