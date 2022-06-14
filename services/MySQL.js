const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const {
  GET_ISSUES_BY_VISIT_ID,
  EDIT_SPECIALIST, ADD_ISSUE,
  DELETE_ISSUE, CLOSE_ISSUE,
  GET_WORKER_SPECIALITIES,
  GET_ALL_SPECIALITIES,
  ADD_SPECIALIST,
  DELETE_SPECIALIST,
  GET_VISIT_BY_ID,
  GET_FREE_WORKERS_FOR_TIME,
  GET_WORKLOAD,
  GET_FREE_VISITS,
  DELETE_VISIT,
  GET_PROBLEM_TYPES,
  GET_PROBLEM_STATISTICS,
  GET_VISIT_ISSUES_BEFORE_SORT,
  UPDATE_DEPENDENCY,
  GET_SORTED_ISSUES,
  SET_SORTED,
  GET_FREE_WORKERS_FOR_PROBLEM,
  UPDATE_START_END_SPECIALIST,
  GET_WORKER_BY_EMAIL,
  GET_USER_CAR_COUNT,
} = require('../utils/constants');

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
      multipleStatements: true,
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
      await this.disconnect();
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
      await this.disconnect();
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
      await this.disconnect();
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
      await this.disconnect();
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
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  findAllVisits = async () => {
    await this.connect();
    const sql = "SELECT user_visit.id, user_visit.id_user, user_visit.dateOfVisit, user_visit.status, user_visit.isSorted, user_visit.comment, user.phoneNumber, user.firstName " +
    "FROM user_visit, user " +
    "WHERE user_visit.id_user = user.id";

    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
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
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  createUserVisit = async (userId, visit) => {
    await this.connect();
    const sql = 'INSERT INTO user_visit (id_user, dateOfVisit, status, comment, id_car, isSorted) VALUES ?';
    const values = [[userId, visit.dateOfVisit, 'Planned', visit.comment, visit.carId, 'No']];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  setSorted = async (id) => {
    await this.connect();
    const sql = SET_SORTED;
    const values = [id];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getVisitById = async (id) => {
    await this.connect();
    const sql = GET_VISIT_BY_ID;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFreeVisits = async (time) => {
    await this.connect();
    const sql = GET_FREE_VISITS;
    const values = Array(4).fill(time);
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0][0].visitsAmount;
    } catch(err) {
      console.log(err);
    }
  }

  deleteVisit = async (id) => {
    await this.connect();
    const sql = DELETE_VISIT;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
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
      await this.disconnect();
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
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  countUserCars = async (userId) => {
    await this.connect();
    const sql = GET_USER_CAR_COUNT;
    const values = [userId];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0][0];
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
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  updateUserCar = async (carId, car) => {
    await this.connect();
    const sql = 'UPDATE user_car SET model = ?, name = ?, year = ?, carcas = ?, color = ?, engine = ?, number = ?, transmission = ?, engineNumber = ? WHERE id = ?';
    const values = [[
      car.model,
      car.name,
      car.year,
      car.carcas,
      car.color,
      car.engine,
      car.number,
      car.transmission,
      car.engineNumber,
      carId,
    ]];
    try {
      const result = await this.connection.query(sql, ...values);
      await this.disconnect();
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
      await this.disconnect();
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
      'Worker',
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
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
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getWorkers = async () => {
    await this.connect();
    const sql = 'SELECT * FROM worker WHERE status = "Worker"';
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
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
      await this.disconnect();
      return result[0][0];
    } catch(err) {
      console.log(err);
    }
  }

  getWorkerInfoById = async (id) => {
    await this.connect();
    const sql = 'SELECT email, firstName, lastName, fatherName, phoneNumber FROM worker WHERE id = ?';
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0][0];
    } catch(err) {
      console.log(err);
    }
  }

  getWorkerSpecialities = async (id) => {
    await this.connect();
    const sql = GET_WORKER_SPECIALITIES;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFullWorkersInfo = async () => {
    await this.connect();
    const sql = 'SELECT worker.firstName, worker.lastName, worker.fatherName, worker.email, worker.phoneNumber, specialist.experience, specialist.isBusy, speciality.name AS speciality ' +
                'FROM worker, specialist, speciality ' +
                'WHERE specialist.id_worker = worker.id AND specialist.id_speciality = speciality.id';
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFreeWorkersForProblem = async (id) => {
    await this.connect()
    const sql = GET_FREE_WORKERS_FOR_PROBLEM;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  updateStartEndSpecialist = async (id, body) => {
    await this.connect();
    const sql = UPDATE_START_END_SPECIALIST;
    const values = [
      body.idSpecialist,
      body.start,
      body.end,
      id,
    ];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getFullFreeWorkersInfo = async (start, end) => {
    await this.connect();
    const sql = GET_FREE_WORKERS_FOR_TIME;
    const values = [start, end, start, end];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getFreeWorkerInfoForTime = async (start, end) => {
    await this.connect();
    const sql = GET_FREE_WORKERS_FOR_TIME;
    const values = [start, end];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
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
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  editWorker = async (worker, id) => {
    await this.connect();
    const sql = 'UPDATE worker SET phoneNumber = ?, firstName = ?, lastName = ?, fatherName = ?, email = ? WHERE id = ?';
    const values = [
      worker.phoneNumber,
      worker.firstName,
      worker.lastName,
      worker.fatherName,
      worker.email,
      id,
    ];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  addSpecialist = async (specialist) => {
    await this.connect();
    const sql = ADD_SPECIALIST;
    const values = [[
      specialist.id_worker,
      specialist.id_speciality,
      specialist.experience,
      specialist.id_problem_type,
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  deleteSpecialist = async (id_worker, id_speciality) => {
    await this.connect();
    const sql = DELETE_SPECIALIST;
    const values = [id_worker, id_speciality];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  editSpecialist = async (specialist) => {
    await this.connect();
    const sql = EDIT_SPECIALIST;
    const values = [
      specialist.isBusy,
      specialist.startTime,
      specialist.endTime,
      specialist.id,
    ];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
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
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getVisitIssuesBeforeSort = async (id) => {
    await this.connect();
    const sql = GET_VISIT_ISSUES_BEFORE_SORT;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  setDependency = async (id, body) => {
    await this.connect();
    const sql = UPDATE_DEPENDENCY;
    const values = [
      body.degree,
      body.dependsOn,
      id,
    ];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  setIssueSequence = async (array) => {
    const string = array.map(item => `UPDATE issues set sequence = ${item.sequence} WHERE id = ${item.id}; `).join(' ');
    await this.connect();
    try {
      const result = await this.connection.query(string);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getSortedissues = async (id) => {
    await this.connect();
    const sql = GET_SORTED_ISSUES;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  addIssue = async (issue) => {
    await this.connect();
    const sql = ADD_ISSUE;
    const values = [[
      issue.visitId,
      issue.description,
      issue.price,
      'No',
      issue.degree,
      issue.dependsOn,
    ]];
    try {
      const result = await this.connection.query(sql, [values]);
      await this.disconnect();
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  deleteIssue = async (id) => {
    await this.connect();
    const sql = DELETE_ISSUE;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  closeIssue = async (id) => {
    await this.connect();
    const sql = CLOSE_ISSUE;
    const values = [id];
    try {
      const result = await this.connection.query(sql, values);
      await this.disconnect();
      return result[0].affectedRows;
    } catch(err) {
      console.log(err);
    }
  }

  getAllSpecialities = async () => {
    await this.connect();
    const sql = GET_ALL_SPECIALITIES;
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getWorkload = async () => {
    await this.connect();
    const sql = GET_WORKLOAD;
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getProblemStatistics = async () => {
    await this.connect();
    const sql = GET_PROBLEM_STATISTICS;
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  getProblemTypes = async () => {
    await this.connect();
    const sql = GET_PROBLEM_TYPES;
    try {
      const result = await this.connection.query(sql);
      await this.disconnect();
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