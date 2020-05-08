const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  pdf: {
    type: String,
    required: true,
  },
  price: {
    type: [mongoose.Decimal128],
    required: true,
  },
  total: {
    type: [mongoose.Decimal128],
    required: true,
  },
  subTotal: {
    type: mongoose.Decimal128,
    required: true,
  },
}, {
  timestamps: true
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;