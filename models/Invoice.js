const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  cost: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice; 