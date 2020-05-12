const graphql = require('graphql');
const mongoose = require('mongoose');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');
const BookingRequest = require('../models/BookingRequest');
const Shipment = require('../models/Shipment');
const Company = require('../models/Company');
const BookingConfirmation = require('../models/BookingConfirmation');

const { BOOKING_STATUS, BOL_STATUS, INVOICE_STATUS } = require('../constants/Status');

const { 
  QuoteType,
  QuoteInputType,
  ValidityInputType,
  FeeInputType,

  ShipmentType,
  CompanyType,
  BookingRequestInputType,

  BookingConfirmationType,
  BookingConfirmationInputType,
} = require('./types/index.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addQuoteToSchedules: {
      type: QuoteType,
      args: {
        routeId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        carrier: {
          type: new GraphQLNonNull(GraphQLString)
        },
        validity: {
          type: new GraphQLNonNull(ValidityInputType)
        },
        buying: {
          type: new GraphQLNonNull(FeeInputType)
        },
        selling: {
          type: new GraphQLNonNull(FeeInputType)
        },
        except: {
          type: GraphQLString
        },
      },
      resolve(parent, args) { 
        let quote = new Quote({
          validity: args.validity,
          buying: args.buying,
          selling: args.selling,
          except: args.except,
        });
        return quote.save(function(err, savedQuote) {
          Route.findOneAndUpdate(
            { routeId: args.routeId, carrier: args.carrier },
            { $push: { quoteHistory: savedQuote } },
            { new: true },
            function (err, data) {
              console.log(err);
            }
          )
        });
      }
    },
    createBookingRequestAndInitShipment: {
      type: ShipmentType,
      args: {
        companyId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        scheduleId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        bookingRequest: {
          type: new GraphQLNonNull(BookingRequestInputType)
        },
      },
      resolve(parent, args) { 
        let bookingRequest = new BookingRequest(args.bookingRequest);
        bookingRequest.save(function(err, savedBookingRequest) {
          const shipment = new Shipment({
            schedule: mongoose.Types.ObjectId(args.scheduleId),
            bookedBy: mongoose.Types.ObjectId(args.companyId),
            bookingRequest: {
              form: savedBookingRequest,
              status: BOOKING_STATUS[0],
            },
            billInstruction: {
              status: BOL_STATUS[0]
            },
            invoice: {
              status: INVOICE_STATUS[0]
            },
          })
          return shipment.save();
        });
      }
    },
    createBookingConfirmation: {
      type: BookingConfirmationType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        bookingConfirmation: {
          type: new GraphQLNonNull(BookingConfirmationInputType)
        }
      },
      resolve(parent, args) { 
        const bookingConfirmation = new BookingConfirmation(args.bookingConfirmation);
        bookingConfirmation.save((err, savedBookingConfirmation) => {
          return Shipment.findOneAndUpdate(
            {_id: args.shipmentId},
            { $set: { 
              "bookingRequest.confirmation": savedBookingConfirmation,
              "bookingRequest.status": BOOKING_STATUS[1],
              "billInstruction.status": BOL_STATUS[1]
            } },
            { new: true },
            function (err, data) {
              console.log(err);
            }
          );
        })
      }
    }
  }
})

module.exports = Mutation;
