const mongoose = require('mongoose');

const BillInstructionSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  shipper: {
    type: String,
    required: true,
  },
  consignee: {
    type: String,
    required: true,
  },
  notify: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  containers: {
    type: [containerInfoSubSchema],
    required: true,
  },
  orderNo: {
    type: String,
    required: true,
  },
  hsCode: {
    type: String,
    required: true,
  },
  caedNo: {
    type: String,
    required: true,
  },
  cargoValue: {
    type: String,
    required: true,
  },
});

const containerInfoSubSchema = {
  containerNo: String,
  seelNo: String, 
  weight: Schema.Types.Decimal128,
  measurement: Schema.Types.Decimal128,
  vgm: Schema.Types.Decimal128
}

const BillInstruction = mongoose.model('BillInstruction', BillInstructionSchema);

module.exports = BillInstruction;