const express = require('express');
const router = express.Router({ mergeParams: true }); 


const {
  listVoyageItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/ItemController');

const { creationItemSchema, miseAJourItemSchema } = require('../validations/item.validation');
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


router.get('/', authMiddleware, listVoyageItems);

router.post('/', authMiddleware, validate(creationItemSchema), createItem);

router.patch('/:itemId', authMiddleware, validate(miseAJourItemSchema), updateItem);

router.delete('/:itemId', authMiddleware, deleteItem);

module.exports = router;
