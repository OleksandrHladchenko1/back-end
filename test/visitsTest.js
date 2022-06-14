const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('Visits', () => {
  it('should get all the user visits', (done) => {
    const user = {
      email: 'oleksandr.hladchenkofe4@gmail.com',
      password: 'qwerty123456',
      startStatus: 'User',
    };
    chai.request(server).post('/api/auth/login').send(user).end((err, res) => {
      const url = '/api/userVisits/allUserVisits/20';
      chai
        .request(server)
        .get(url)
        .set("Authorization", "Bearer " + res.body.token)
        .end((err, res) => {
        res.should.have.status(200);
        res.body.visits.should.be.a('array');
        done();
      });
    });
  });

  it('should create new visit', (done) => {
    const user = {
      email: 'oleksandr.hladchenkofe4@gmail.com',
      password: 'qwerty123456',
      startStatus: 'User',
    };
    chai.request(server).post('/api/auth/login').send(user).end((err, res) => {
      const url = '/api/userVisits/addUserVisit/20';
      const visit = {
        "dateOfVisit": "2023-09-24 12:00:00",
        "comment": "test",
        "carId": 18,
      };
      chai
        .request(server)
        .post(url)
        .send(visit)
        .set("Authorization", "Bearer " + res.body.token)
        .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.equal('Successfully created visit');
        done();
      });
    });
  });
});