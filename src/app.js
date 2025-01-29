const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth.routes');
const voyageRoutes = require('./routes/voyage.routes');
const itemRoutes = require('./routes/item.routes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Connexion à la DB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/voyages', voyageRoutes);
app.use('/voyages/:voyageId/items', itemRoutes);

// Gestion du 404 si aucune route ne correspond
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
