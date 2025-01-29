const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET || 'SECRET_LOCAL';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Format de token invalide" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}

module.exports = {
  authMiddleware,
  SECRET_KEY
};
