const { z } = require('zod');

// Inscription : email, password
const inscriptionUtilisateurSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// Connexion : email, password
const connexionUtilisateurSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

module.exports = {
  inscriptionUtilisateurSchema,
  connexionUtilisateurSchema
};
