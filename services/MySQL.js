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
      password: 'Superalexworld2020',
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
  
  findTask = async (title) => {
    await this.connect();
    const sql = "SELECT * FROM task WHERE title = ?";
    const values = [[title]];
    try {
      const result = await this.connection.query(sql, [values]);
      return result[0][0];
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