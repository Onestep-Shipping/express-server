const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
  },
  quoteHistory: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quote'
  }],
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
});

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;