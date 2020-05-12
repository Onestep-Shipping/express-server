const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  cost: {
    type: mongoose.Decimal128,
    required: true,
  },
  revenue: {
    type: mongoose.Decimal128,
    required: true,
  },
  profit: {
    type: mongoose.Decimal128,
    required: true,
  },
}, {
  timestamps: true
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice; 