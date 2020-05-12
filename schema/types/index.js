const RouteType = require('./RouteType.js');
const QuoteType = require('./QuoteType.js');
const QuoteInputType = require('./QuoteInputType.js');
const ScheduleType = require('./ScheduleType.js');
const BookingRequestType = require('./BookingRequestType.js');
const BookingRequestInputType = require('./BookingRequestInputType.js');
const ShipmentType = require('./ShipmentType.js');
const CompanyType = require('./CompanyType.js');
const BookingConfirmationType = require('./BookingConfirmationType.js');
const BookingConfirmationInputType = require('./BookingConfirmationInputType.js');
const BillInstructionType = require('./BillInstructionType.js');
const BillInstructionInputType = require('./BillInstructionInputType.js');

module.exports = { 
  RouteType, 
  ScheduleType,
  
  QuoteType,
  QuoteInputType,

  ShipmentType,
  CompanyType,
  BookingRequestInputType,
  
  BookingConfirmationType,
  BookingConfirmationInputType,

  BillInstructionType,
  BillInstructionInputType,
}