const express = require('express');
const router = express.Router();
const { listUserVoyages, createVoyage } = require('../controllers/VoyageController');
const { creationVoyageSchema } = require('../validations/voyage.validation');
const { authMiddleware } = require('../middlewares/auth');
const { z } = require('zod');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map(i => i.message);
      return res.status(400).json({ errors });
    }
    req.body = result.data;
    next();
  };
}

router.get('/', authMiddleware, listUserVoyages);
router.post('/', authMiddleware, validate(creationVoyageSchema), createVoyage);

module.exports = router;
