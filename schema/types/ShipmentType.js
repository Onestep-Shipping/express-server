const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ScheduleType = require('./ScheduleType');
const CompanyType = require('./CompanyType');
const BookingRequestType = require('./BookingRequestType');
const BookingConfirmationType = require('./BookingConfirmationType');
const BillInstructionType = require('./BillInstructionType');
const InvoiceType = require('./InvoiceType');

const ShipmentType = new GraphQLObjectType({
  name: 'ShipmentType',
  fields: () => ({
    schedule: {
      type: new GraphQLNonNull(ScheduleType)
    },
    bookedBy: {
      type: new GraphQLNonNull(CompanyType)
    },
    bookingRequest: {
      type: new GraphQLNonNull(BookingRequestDataType)
    },
    billInstruction: {
      type: new GraphQLNonNull(BillInstructionDataType)
    },
    invoice: {
      type: new GraphQLNonNull(InvoiceDataType)
    },
  })
});

const BookingRequestDataType = new GraphQLObjectType({
  name: 'BookingRequestDataType',
  fields: () => ({
    form: {
      type: new GraphQLNonNull(BookingRequestType)
    },
    confirmation: {
      type: BookingConfirmationType
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
}); 

const BillInstructionDataType = new GraphQLObjectType({
  name: 'BillInstructionDataType',
  fields: () => ({
    form: {
      type: new GraphQLNonNull(BillInstructionType)
    },
    pdf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
}); 

const InvoiceDataType = new GraphQLObjectType({
  name: 'InvoiceDataType',
  fields: () => ({
    form: {
      type: new GraphQLNonNull(InvoiceType)
    },
    pdf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    tempCost: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
}); 

module.exports = ShipmentType;