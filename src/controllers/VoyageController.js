const Voyage = require('../models/Voyage');


async function listUserVoyages(req, res) {
  try {
    const voyages = await Voyage.find({ user: req.user.userId });
    return res.status(200).json(voyages);
  } catch (error) {
    console.error("Erreur list voyages :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}


async function createVoyage(req, res) {
  try {
    const { destination, startDate, endDate } = req.body;

    const voyage = new Voyage({
      destination,
      startDate,
      endDate,
      user: req.user.userId
    });

    await voyage.save();
    return res.status(201).json(voyage);
  } catch (error) {
    console.error("Erreur create voyage :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

module.exports = {
  listUserVoyages,
  createVoyage
};
