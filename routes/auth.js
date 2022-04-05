const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { checkToken } = require('../services/token_validation');

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

        res.status(201).json({ success: 1, message: 'Successful registration!', email });
      }
    }
  );
  router.post('/login', async (req, res) => {
      const { email, password, startStatus } = req.body;
      const user = await mySQLService.findUser(email, startStatus);

      if (!user) {
        return res.status(400).json({ success: 0, message: 'User not found' });
      }
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return res.status(401).json({ success: 0, message: 'Wrong password' });
      }

      const token = jwt.sign(
        { idUser: user.id },
        'JWT_SECRET', 
        { expiresIn: '10h' }
      );

      res.status(200).json({user: {
          idUser: user.id,
        },
        token,
      });
  });

  router.patch('/changePassword', checkToken, async (req, res) => {
    const { email, oldPassword, newPassword1, newPassword2 } = req.body;

    if(oldPassword.trim() === '' || newPassword1.trim() === '' || newPassword2.trim() === '') {
      res.status(400).json({ success: 0, message: 'Please, fill all the fields!' });
    }

    const user = await mySQLService.findUser(email);

    if(!user) {
      res.status(400).json({ success: 0, message: 'User was not found' });
    }

    const isEqual = await bcrypt.compare(oldPassword, user.password);

    if(!isEqual) {
      res.status(400).json({ success: 0, message: 'Old password doesn`t match' });
    }

    if(newPassword1 !== newPassword2) {
      res.status(400).json({ success: 0, message: 'New passwords are not equal' });
    }

    if(oldPassword === newPassword1) {
      res.status(400).json({ success: 0, message: 'Old and new password are equal' });
    }

    const cryptedPassword = await bcrypt.hash(newPassword1, 10);
    
    await mySQLService.changePassword(email, cryptedPassword);

    res.status(200).json({ success: 1, message: 'Passowrd was successfully changed' });
  });

  return router;
}; 