const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { GET_ISSUES_BY_VISIT_ID } = require('../utils/constants');

class MySQL {
  constructor() {
    this.connection = null;
  }

  connect = async () => {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Superalexworld2018',
      database: 'sto',
    });

    return this.connection;
  }

  async disconnect() {
    return this.connection.end();
  }

  findUser = async (email, startStatus) => {
    let sql;
    await this.connect();
    sql = startStatus === 'User' ? "SELECT * FROM user WHERE email = ?" : "SELECT * FROM worker WHERE email = ?";
    const values = [[email]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result[0][0];
    } catch(err) {
      console.log(err);
    }
  }

  updateUserInfo = async (user) => {
    await this.connect();
    const sql = "UPDATE user SET phoneNumber = ?, firstName = ?, lastName = ?, fatherName = ?, dateOfBirth = ?, email = ? WHERE id = ?";
    const values = [
      user.phoneNumber,
      user.firstName,
      user.lastName,
      user.fatherName,
      user.dateOfBirth,
      user.email,
      user.id,
    ];
    try {
      const result = await this.connection.query(sql, values);
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getUserById = async (id) => {
    await this.connect();
    const sql = 'SELECT * FROM user WHERE id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return {
        id: result[0][0].id,
        phoneNumber: result[0][0].phoneNumber,
        firstName: result[0][0].firstName,
        lastName: result[0][0].lastName,
        fatherName: result[0][0].fatherName,
        dateOfBirth: result[0][0].dateOfBirth,
        discount: result[0][0].discount,
        email: result[0][0].email,
      };
    } catch(err) {
      console.log(err);
    }
  }

  registerUser = async (body) => {
    await this.connect();
    const sql = "INSERT INTO user (phoneNumber, firstName, lastName, fatherName, dateOfBirth, discount, email, password) VALUES ?";
    const cryptedPassword = await bcrypt.hash(body.password, 10);
    const values = [[
      body.phoneNumber,
      body.firstName,
      body.lastName,
      body.fatherName,
      body.dateOfBirth,
      0,
      body.email,
      cryptedPassword,
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  changePassword = async (email, password) => {
    await this.connect();
    const sql = 'UPDATE user SET password = ? WHERE email = ?';
    const values = [password, email];
    try {
      const result = await this.connection.query(sql, values);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  findAllVisits = async () => {
    await this.connect();
    const sql = "SELECT user_visit.id, user_visit.id_user, user_visit.dateOfVisit, user_visit.status, user_visit.comment, user.phoneNumber, user.firstName " +
    "FROM user_visit, user " +
    "WHERE user_visit.id_user = user.id";

    try {
      const result = await this.connection.query(sql);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  findUserVisits = async (userId) => {
    await this.connect();
    const sql = 'SELECT * FROM user_visit WHERE id_user = ?';
    const values = [userId];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  createUserVisit = async (userId, visit) => {
    await this.connect();
    const sql = 'INSERT INTO user_visit (id_user, dateOfVisit, status, comment) VALUES ?';
    const values = [[userId, visit.dateOfVisit, 'Planned', visit.comment]];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  getVisitById = async (id) => {
    await this.connect();
    const sql = 'SELECT user_visit.dateOfVisit, user_visit.status, user.phoneNumber, user.firstName, user.lastName, user.fatherName, user.dateOfBirth, user.discount, user.email ' +
                'FROM user_visit, user ' +
                'WHERE user_visit.id_user = user.id AND user_visit.id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  changeVisitStatus = async (id, status) => {
    await this.connect();
    const sql = 'UPDATE user_visit SET status = ? WHERE id = ?';
    const values = [status, id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  findUserCars = async (userId) => {
    await this.connect();
    const sql = 'SELECT * FROM user_car WHERE id_user = ?';
    const values = [userId];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  addUserCar = async (car) => {
    await this.connect();
    const sql = 'INSERT INTO user_car (id_user, model, name, year, carcas, color, engine, number, transmission, engineNumber) VALUES ?';
    const values = [[
      car.userId,
      car.model,
      car.name,
      car.year,
      car.carcas,
      car.color,
      car.engine,
      car.number,
      car.transmission,
      car.engineNumber,
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  updateUserCar = async (carId, car) => {
    await this.connect();
    const sql = 'UPDATE user_car SET model = ?, name = ?, year = ?, carcas = ?, color = ? WHERE id = ?';
    const values = [[
      car.model,
      car.name,
      car.year,
      car.carcas,
      car.color,
      carId,
    ]];
    try {
      const result = await this.connection.query(sql, ...values);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  deleteUserCar = async (id) => {
    await this.connect();
    const sql = 'DELETE FROM user_car WHERE id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  createWorker = async (worker) => {
    await this.connect();
    const sql = 'INSERT INTO worker (phoneNumber, firstName, lastName, fatherName, email, password, status) VALUES ?';
    const values = [[
      worker.phoneNumber,
      worker.firstName,
      worker.lastName,
      worker.fatherName,
      worker.email,
      worker.password,
      worker.status,
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  deleteWorker = async (id) => {
    await this.connect();
    const sql = 'DELETE FROM worker WHERE id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getWorkers = async () => {
    await this.connect();
    const sql = 'SELECT * FROM worker';
    try {
      const result = await this.connection.query(sql);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getWorkersById = async (id) => {
    await this.connect();
    const sql = 'SELECT * FROM worker WHERE id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0][0];
    } catch(err) {
      console.log(err);
    }
  }

  getFullWorkersInfo = async () => {
    await this.connect();
    const sql = 'SELECT worker.firstName, worker.lastName, worker.fatherName, worker.phoneNumber, specialist.experience, specialist.isBusy, speciality.name AS speciality ' +
                'FROM worker, specialist, speciality ' +
                'WHERE specialist.id_worker = worker.id AND specialist.id_speciality = speciality.id';
    try {
      const result = await this.connection.query(sql);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFullFreeWorkersInfo = async () => {
    await this.connect();
    const sql = 'SELECT specialist.id AS specialistId, worker.id AS workerId, worker.firstName, worker.lastName, worker.fatherName, worker.phoneNumber, specialist.experience, specialist.isBusy, speciality.name AS speciality ' +
                'FROM worker, specialist, speciality ' +
                'WHERE specialist.id_worker = worker.id AND specialist.id_speciality = speciality.id AND specialist.isBusy = "No"';
    try {
      const result = await this.connection.query(sql);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFullWorkerInfoById = async (id) => {
    await this.connect();
    const sql = 'SELECT worker.firstName, worker.lastName, worker.fatherName, worker.phoneNumber, specialist.experience, specialist.isBusy, speciality.name AS speciality ' +
                'FROM worker, specialist, speciality ' +
                'WHERE specialist.id_worker = worker.id AND specialist.id_speciality = speciality.id AND worker.id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  editWorker = async (worker, id) => {
    await this.connect();
    const sql = 'UPDATE worker SET phoneNumber = ?, firstName = ?, lastName = ?, fatherName = ? WHERE id = ?';
    const values = [[
      worker.phoneNumber,
      worker.firstName,
      worker.lastName,
      worker.fatherName,
      id,
    ]];
    try {
      const result = await this.connection.query(sql, ...values);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  getIssuesByVisitId = async (id, status) => {
    await this.connect();
    const sql = GET_ISSUES_BY_VISIT_ID;
    const values = [id, status];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  max = async () => {
    const client = await this.connect();

    if(client) {
      console.info('Successfully connected to MySQL!');
    } else {
      throw new Error('Connecting to MySQL failed!');
    }
  }
}

module.exports = MySQL; 