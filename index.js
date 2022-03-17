require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes');

const MySQLBackend = require('./services/MySQL');

app.use(cors());
app.use(express.json());
app.use('/api', routes());
app.use(bodyParser.json());

const runMySQL = async () => {
  const mysqlBackend = new MySQLBackend();
  return mysqlBackend.max();
}

runMySQL();

const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log('Server up and working... on port ', port);
});
