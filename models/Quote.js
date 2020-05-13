const mongoose = require('mongoose');

const validitySubSchema = {
  startDate: Date, endDate: Date
}

const priceSubSchema = {
  oceanFreight: [{
    containerType: String,
    price: Number,
  }], 
  docFee: Number,
  adminFee: Number
}

const QuoteSchema = new mongoose.Schema({
  validity: {
    type: validitySubSchema,
    required: true,
  },
  buying: {
    type: priceSubSchema,
    required: true,
  },
  selling: {
    type: priceSubSchema,
    required: true,
  },
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;