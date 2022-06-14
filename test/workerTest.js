const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('workers API', () => {
  describe('GET all method', () => {
    it('should return an array of workers', (done) => {
      chai.request(server).get('/api/workers/getAllWorkers').end((err, res) => {
        res.should.have.status(200);
        res.body.workers.should.be.a('array');
        done();
      });
    });
  });
});
