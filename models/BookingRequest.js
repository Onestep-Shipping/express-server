const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
  commodity: {
    type: String,
    required: true,
  },
  hsCode: {
    type: String,
    required: true,
  },
  containers: [{
    containerType: String,
    quantity: Number,
  }],
  paymentTerm: String,
  autoFilling: Boolean
}, {
  timestamps: true
});

const BookingRequest = mongoose.model('BookingRequest', BookingRequestSchema);

module.exports = BookingRequest;