const Route = require('../models/Route');
const Schedule = require('../models/Schedule');

const CARRIERS = ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL', 'OOCL', 'Zim Line'];

const SCHEDULES = require('./schedule.json');

const autoGenerateSchedule = () => {
  let hugeSchedules = [];
  SCHEDULES.map(schedule => {
    Route.findOne({ 
      routeId: schedule.routeId,
      carrier: schedule.carrier
    }).then(route => {
      // TODO: Switch to insert many
      Schedule.collection.insertOne(new Schedule({
        route,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        transitTime: schedule.transitTime,
        transshipment: schedule.transshipment,
        vessels: schedule.vessels.split("; ")
      }))
    })
  })
}

module.exports = autoGenerateSchedule;