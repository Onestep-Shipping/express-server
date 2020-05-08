const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  commodity: {
    type: String,
    required: true,
  },
  hsCode: {
    type: String,
    required: true,
  },
  containers: {
    type: Map,
    of: Number
  },
  paymentTerm: String,
  autoFilling: Boolean
});

const BookingRequest = mongoose.model('BookingRequest', BookingRequestSchema);

module.exports = BookingRequest;