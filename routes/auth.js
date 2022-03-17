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
        res.status(400).json({ success: 0, message: 'User with this email already exists' });
      } else {
        await mySQLService.registerUser(req.body);

        res.status(201).json({ success: 1, message: 'Successful registration!' });
      }
    }
  );
  router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await mySQLService.findUser(email);

      if (!user) {
        return res.status(400).json({ success: 0, message: 'User not found' });
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return res.status(400).json({ success: 0, message: 'Wrong password' });
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