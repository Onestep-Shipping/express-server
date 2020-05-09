const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Schedule'
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company'
  },
  bookingRequest: {
    form: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'BookingRequest'
    },
    confirmation: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'BookingConfirmation'
    },
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
    confirmation: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Invoice'
    },
    status: String,
  },
  finance: {
    cost: mongoose.Decimal128,
    revenue: mongoose.Decimal128,
    profit: mongoose.Decimal128
  }
});

const Shipment = mongoose.model('Shipment', ShipmentSchema);

module.exports = Shipment;