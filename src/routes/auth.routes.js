const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getConnectedUser } = require('../controllers/AuthController');
const { inscriptionUtilisateurSchema, connexionUtilisateurSchema } = require('../validations/auth.validation');
const { authMiddleware } = require('../middlewares/auth');
const { z } = require('zod');

// Middleware de validation Zod
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => i.message);
      return res.status(400).json({ errors });
    }
    
    req.body = result.data;
    next();
  };
}

router.post('/register', validate(inscriptionUtilisateurSchema), registerUser);
router.post('/login', validate(connexionUtilisateurSchema), loginUser);
router.get('/me', authMiddleware, getConnectedUser);

module.exports = router;
