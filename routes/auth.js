const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MySQLService = require('../services/MySQL');

module.exports = () => {
  const mySQLService = new MySQLService();
  router.post('/register', async (req, res) => {
      const { email } = req.body;
      let user = await mySQLService.findUser(email);
      
      if (user) {
        res.status(400).json();
      } else {
        await mySQLService.registerUser(req.body);

        res.status(201).json();
      }
    }
  );
  router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await mySQLService.findUser(email);

      if (!user) {
        return res.status(400).json();
      }

      if (!bcrypt.compare(password, user.password)) {
        return res.status(400).json();
      }

      const token = jwt.sign(
        { idUser: user.id },
        'JWT_SECRET', 
        { expiresIn: '1h' }
      );

      res.status(200).json({user: {
          idUser: user.id,
        },
        token,
      });
  });

  return router;
}; 