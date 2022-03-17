const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

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

  findUser = async (email) => {
    await this.connect();
    const sql = "SELECT * FROM user WHERE email = ?";
    const values = [[email]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result[0][0];
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

  findUserVisits = async (userId, status) => {
    await this.connect();
    const sql = 'SELECT * FROM user_visit WHERE id_user = ? AND status = ?';
    const values = [userId, status];
    try {
      const result = await this.connection.query(sql, values);
      return result[0];
    } catch(err) {
      console.log(err);
    }
  }

  createUserVisit = async (userId, visit) => {
    await this.connect();
    const sql = 'INSERT INTO user_visit (id_user, dateOfVisit, status) VALUES ?';
    const values = [[userId, visit.dateOfVisit, 'Planned']];
    try {
      const result = await this.connection.query(sql, [values]);
      console.log(result);
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
    const sql = 'INSERT INTO user_car (id_user, model, name, year, carcas, color) VALUES ?';
    const values = [[
      car.userId,
      car.model,
      car.name,
      car.year,
      car.carcas,
      car.color,
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
    const sql = 'INSERT INTO worker (phoneNumber, firstName, lastName, fatherName) VALUES ?';
    const values = [[
      worker.phoneNumber,
      worker.firstName,
      worker.lastName,
      worker.fatherName,
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
      console.log(result);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  createTask = async (title, desctiption, idUser) => {
    await this.connect();
    const sql = "INSERT INTO task (done, title, description, idUser) VALUES ?";
    const values = [[0, title, desctiption, idUser]];
    try {
      await this.connection.query(sql, [values]);
    } catch(err) {
      console.log(err);
    }
  }

  updateTaskDone = async (done, idUser, title) => {
    await this.connect();
    const sql = "UPDATE task SET done = ? WHERE idUser = ? AND title = ?";
    const values = [[done], [idUser], [title]];
    try {
      await this.connection.query(sql, values);
    } catch(err) {
      console.log(err);
    }
  }

  updateTaskTitle = async (newTitle, description, oldTitle, idUser) => {
    await this.connect();
    const sql = "UPDATE task SET title = ?, description = ? WHERE title = ? AND idUser = ?";
    const values = [[newTitle], [description], [oldTitle], [idUser]];

    try {
      await this.connection.query(sql, values);
    } catch(err) {
      console.log(err);
    }
  }

  deleteTask = async (title, idUser) => {
    await this.connect();
    const sql = "DELETE from task WHERE title = ? AND idUser = ?";
    const values = [[title], [idUser]];

    try {
      await this.connection.query(sql, values);
    } catch(err) {
      console.log(err);
    }
  }

  getUserTask = async (idUser, done) => {
    await this.connect();
    const sql = "SELECT title, done, description FROM task WHERE idUser = ? AND done = ?";
    const values = [[idUser], [done]];
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