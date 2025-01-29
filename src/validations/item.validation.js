const { z } = require('zod');

const creationItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1).optional()
});

const miseAJourItemSchema = z.object({
  name: z.string().min(1).optional(),
  quantity: z.number().min(1).optional(),
  isTaken: z.boolean().optional()
});

module.exports = {
  creationItemSchema,
  miseAJourItemSchema
};
