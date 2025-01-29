const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/packing_list', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Base de données MongoDB connectée.");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
    process.exit(1);
  }
}

module.exports = connectDB;
