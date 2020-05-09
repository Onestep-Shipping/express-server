const mongoose = require('mongoose');
const AddressSubschema = require('./AddressSubschema');

const personSubSchema = {
  name: String, position: String
}

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSubschema,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
  },
  personInCharge: {
    type: personSubSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  shipments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Shipment'
  }],
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;