require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes');

const MySQLBackend = require('./services/MySQL');

/* const userRouter = require('./api/users/user.router');
const buildingRouter = require('./api/buildings/building.router');
const floorRouter = require('./api/floors/floor.router');
const edgeRouter = require('./api/edges/edge.router'); */

app.use(cors());
app.use(express.json());
app.use('/api', routes());
app.use(bodyParser.json());

const runMySQL = async () => {
  const mysqlBackend = new MySQLBackend();
  return mysqlBackend.max();
}

/* app.use('/api/users', userRouter);
app.use('/api/buildings', buildingRouter);
app.use('/api/floors', floorRouter);
app.use('/api/edges', edgeRouter); */

runMySQL();

const port = process.env.APP_PORT || 3030;
app.listen(port, () => {
  console.log('Server up and working... on port ', port);
});
