const mongoose = require('mongoose');

const containerInfoSubSchema = {
  containerNo: String,
  seelNo: String, 
  weight: Number,
  measurement: Number,
  vgm: Number
}

const BillInstructionSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

const BillInstruction = mongoose.model('BillInstruction', BillInstructionSchema);

module.exports = BillInstruction;