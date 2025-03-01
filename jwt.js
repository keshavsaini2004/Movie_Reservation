const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).json({ error: 'Token Not Found' });
  }

  const token = authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  } 
};

const generateToken = (userData) => {
  const payload = {
    user_id: userData.user_id, 
    email: userData.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
};


module.exports = { jwtAuthMiddleware, generateToken };
