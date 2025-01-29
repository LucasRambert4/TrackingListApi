const Item = require('../models/Item');
const Voyage = require('../models/Voyage');


async function listVoyageItems(req, res) {
  const { voyageId } = req.params;
  try {

    const voyage = await Voyage.findOne({
      _id: voyageId,
      user: req.user.userId
    });
    if (!voyage) {
      return res.status(404).json({ message: "Voyage introuvable ou non autorisé" });
    }

    const items = await Item.find({ voyage: voyageId });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Erreur list items :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}


async function createItem(req, res) {
  const { voyageId } = req.params;
  const { name, quantity } = req.body;

  try {

    const voyage = await Voyage.findOne({
      _id: voyageId,
      user: req.user.userId
    });
    if (!voyage) {
      return res.status(404).json({ message: "Voyage introuvable ou non autorisé" });
    }

    const item = new Item({
      name,
      quantity: quantity || 1,
      voyage: voyageId
    });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    console.error("Erreur create item :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}


async function updateItem(req, res) {
  const { voyageId, itemId } = req.params;
  const { name, quantity, isTaken } = req.body;

  try {

    const voyage = await Voyage.findOne({
      _id: voyageId,
      user: req.user.userId
    });
    if (!voyage) {
      return res.status(404).json({ message: "Voyage introuvable ou non autorisé" });
    }

    const item = await Item.findOne({ _id: itemId, voyage: voyageId });
    if (!item) {
      return res.status(404).json({ message: "Item introuvable" });
    }

    if (name !== undefined) item.name = name;
    if (quantity !== undefined) item.quantity = quantity;
    if (isTaken !== undefined) item.isTaken = isTaken;

    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.error("Erreur update item :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

async function deleteItem(req, res) {
  const { voyageId, itemId } = req.params;
  try {

    const voyage = await Voyage.findOne({
      _id: voyageId,
      user: req.user.userId
    });
    if (!voyage) {
      return res.status(404).json({ message: "Voyage introuvable ou non autorisé" });
    }

    const item = await Item.findOne({ _id: itemId, voyage: voyageId });
    if (!item) {
      return res.status(404).json({ message: "Item introuvable" });
    }

    await item.deleteOne();
    return res.status(204).send();
  } catch (error) {
    console.error("Erreur delete item :", error);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

module.exports = {
  listVoyageItems,
  createItem,
  updateItem,
  deleteItem
};
