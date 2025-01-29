const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET_KEY } = require('../middlewares/auth');

async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    // Vérifier l'email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà enregistré" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Création
    const newUser = new User({ email, passwordHash });
    await newUser.save();

    return res.status(201).json({ message: "Compte créé avec succès" });
  } catch (error) {
    console.error("Erreur inscription :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Générer le JWT
    const token = jwt.sign(
      { userId: user._id },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur connexion :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

async function getConnectedUser(req, res) {
  try {
    
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erreur récupération utilisateur :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getConnectedUser
};
