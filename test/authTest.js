const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('Auth', () => {
  describe('Log in', () => {
    it('should log in user', (done) => {
      const user = {
        email: 'oleksandr.hladchenkofe4@gmail.com',
        password: 'qwerty123456',
        startStatus: 'User',
      }
      chai.request(server).post('/api/auth/login').send(user).end((err, res) => {
        res.should.have.status(200);
        res.body.token.should.be.a('string');
        done();
      });
    });
  });

  describe('Sign up', () => {
    it('should sign up user', (done) => {
      const user = {
        email: 'oleksandr.hladchenkofe5@gmail.com',
        password: 'qwerty12345',
        phoneNumber: '+380000000000',
        firstName: 'Tester',
      };
      chai.request(server).post('/api/auth/register').send(user).end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).to.equal('Successful registration!');
        done();
      });
    });
  });
});
