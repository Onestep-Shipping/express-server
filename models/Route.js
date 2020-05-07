const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  quoteHistory: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quote'
  }],
  startLocation: {
    type: portSubSchema,
    required: true,
  },
  endLocation: {
    type: portSubSchema,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
});

const portSubSchema = {
  name: String, code: String
}

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;