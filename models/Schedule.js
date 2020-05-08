const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Route'
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  transitTime: {
    type: Number,
    required: true,
  },
  transshipment: {
    type: Number,
    required: true,
  },
  vessels: {
    type: [String],
    required: true,
  }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;