const mongoose = require('mongoose');

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

const validitySubSchema = {
  startDate: Date, endDate: Date
}

const priceSubSchema = {
  oceanFreight: [{
    containerType: String,
    price: Schema.Types.Decimal128,
  }], 
  docFee: Schema.Types.Decimal128,
  adminFee: Schema.Types.Decimal128
}

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;