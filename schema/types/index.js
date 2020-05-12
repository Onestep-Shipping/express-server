const RouteType = require('./RouteType.js');
const QuoteType = require('./QuoteType.js');
const ScheduleType = require('./ScheduleType.js');
const BookingRequestType = require('./BookingRequestType.js');
const BookingRequestInputType = require('./BookingRequestInputType.js');
const ShipmentType = require('./ShipmentType.js');
const CompanyType = require('./CompanyType.js');
const BookingConfirmationType = require('./BookingConfirmationType.js');
const BookingConfirmationInputType = require('./BookingConfirmationInputType.js');
const {
  QuoteInputType,
  ValidityInputType,
  FeeInputType,
} = require('./QuoteInputType.js');

module.exports = { 
  RouteType, 
  QuoteType, 
  ScheduleType,
  
  QuoteInputType,
  ValidityInputType,
  FeeInputType,

  ShipmentType,
  CompanyType,
  BookingRequestInputType,
  
  BookingConfirmationInputType,
}