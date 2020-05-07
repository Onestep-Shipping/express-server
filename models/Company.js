const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: addressSubSchema,
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
  }
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  shipments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Shipment'
  }],
}, {
  timestamps: true,
});

const addressSubSchema = {
  street: String, city: String, country: String
}

const personSubSchema = {
  name: String, position: String
}

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;