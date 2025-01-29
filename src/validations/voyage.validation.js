const { z } = require('zod');

const creationVoyageSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Date de début invalide"
  }),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Date de fin invalide"
  })
});

module.exports = {
  creationVoyageSchema
};
