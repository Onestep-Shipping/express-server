const mongoose = require('mongoose');
const AddressSubschema = require('./AddressSubschema');

const BookingConfirmationSchema = new mongoose.Schema({
  timeReceived: {
    type: Number,
    default: 0,
  },
  pdf: {
    type: String,
    required: true,
  },
  bookingNo: {
    type: String,
    required: true,
  },
  etd: {
    type: Date,
    required: true,
  },
  eta: {
    type: Date,
    required: true,
  },
  terminaCutoff: {
    type: Date,
    required: true,
  },
  docCutoff: {
    type: Date,
    required: true,
  },
  vgmCutoff: {
    type: Date,
    required: true,
  },
  pickUpLocation: {
    type: AddressSubschema,
    required: true,
  },
  returnLocation: {
    type: AddressSubschema,
    required: true,
  },
}, {
  timestamps: true
});

const BookingConfirmation = mongoose.model('BookingConfirmation', BookingConfirmationSchema);

module.exports = BookingConfirmation;