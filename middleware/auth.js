const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'Unauthorized access' });
  try {
    // verfiy token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ msg: 'Invalid Token' });
  }
};

module.exports = auth;
