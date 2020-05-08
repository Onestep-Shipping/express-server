const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Schedule'
  },
  by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company'
  }
  bookingRequest: {
    form: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'BookingRequest'
    },
    received: Number,
    pdf: String,
    status: String,
  },
  billInstruction: {
    form: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'BillInstruction'
    },
    pdf: String,
    status: String,
  },
  invoice: {
    pdf: String,
    status: String,
  },
  finance: {
    cost: Schema.Types.Decimal128,
    revenue: Schema.Types.Decimal128,
    profit: Schema.Types.Decimal128
  }
});

const Shipment = mongoose.model('Shipment', ShipmentSchema);

module.exports = Shipment;