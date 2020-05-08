const Route = require('../models/Route');
const Schedule = require('../models/Schedule');

const CARRIERS = ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL', 'OOCL', 'Zim Line'];

const SCHEDULES = [
  
];

const autoGenerateSchedules = () => {
  let hugeSchedules = [];
  SCHEDULES.map(schedule => {
    Route.findOne({ 
      routeId: schedule.routeId,
      carrier: schedule.carrier
    }).then(route => {
      Schedule.findOne({ 
        route: route._id,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        transitTime: schedule.transitTime,
        transshipment: schedule.transshipment,
        vessels: schedule.vessels.split(";")
      }).then(schedule => {
        if (!schedule) {
          hugeSchedules.push(new Schedule({
            route,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            transitTime: schedule.transitTime,
            transshipment: schedule.transshipment,
            vessels: schedule.vessels.split(";")
          }))
        }
      })
    }
  })
  Schedule.collection.insertMany(hugeSchedules, onInsert);
}

function onInsert(err, docs) {
  if (err) {
      // TODO: handle error
  } else {
      console.info('%d schedules were successfully stored.', docs.length);
  }
}

module.exports = autoGenerateSchedules;