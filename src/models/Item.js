const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  isTaken: { type: Boolean, default: false },
  voyage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voyage',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
