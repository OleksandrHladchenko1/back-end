const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if(token) {
      token = token.slice(7);
      verify(token, 'JWT_SECRET', (err, decoded) => {
        if(err) {
          res.status(401).json({ success: 0, message: 'Invalid token' });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ success: 0, message: 'Access denied! Unauthorized user!' });
    }
  },
};

