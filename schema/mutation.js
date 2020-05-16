const graphql = require('graphql');
const mongoose = require('mongoose');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');
const BookingRequest = require('../models/BookingRequest');
const Shipment = require('../models/Shipment');
const Company = require('../models/Company');
const BookingConfirmation = require('../models/BookingConfirmation');
const BillInstruction = require('../models/BillInstruction');
const Invoice = require('../models/Invoice');

const calculateCost = require('../utils/calculateCost.js');

const { BOOKING_STATUS, BOL_STATUS, INVOICE_STATUS } = require('../constants/Status');

const {
  BillInstructionType,
  BillInstructionInputType,
  BookingRequestInputType,
  BookingConfirmationType,
  BookingConfirmationInputType,
  CompanyType,
  QuoteType,
  QuoteInputType,
  ShipmentType,
  InvoiceType,
  InvoiceInputType,
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
        quote: {
          type: new GraphQLNonNull(QuoteInputType)
        },
      },
      resolve(parent, args) { 
        let quote = new Quote(args.quote);
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
      type: GraphQLString,
      args: {
        companyId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        scheduleId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        quoteId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        bookingRequest: {
          type: new GraphQLNonNull(BookingRequestInputType)
        },
      },
      resolve(parent, args) { 
        let bookingRequest = new BookingRequest(args.bookingRequest);
        bookingRequest.save(function(err, savedBookingRequest) {
          Quote.findById(args.quoteId, function (err, quote) {
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
                status: INVOICE_STATUS[0],
                tempCost: calculateCost(quote.buying, bookingRequest.containers)
              },
            })
            shipment.save(function(error, result){
              if (result) {
                Company.findOneAndUpdate(
                  { _id: args.args.companyId },
                  { $push: { shipments: result } },
                  { new: true },
                  function (err, data) {
                    if (data) {
                      return "OK";
                    }
                  }
                )
              }
            });
          });
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
        return bookingConfirmation.save((err, savedBookingConfirmation) => {
          Shipment.findOneAndUpdate(
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
    },
    createBillInstruction: {
      type: BillInstructionType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        billInstruction: {
          type: new GraphQLNonNull(BillInstructionInputType)
        }
      },
      resolve(parent, args) { 
        const billInstruction = new BillInstruction(args.billInstruction);
        return billInstruction.save((err, savedBillInstruction) => {
          Shipment.findOneAndUpdate(
            {_id: args.shipmentId},
            { $set: { 
              "billInstruction.form": savedBillInstruction,
              "billInstruction.status": BOL_STATUS[2],
            } },
            { new: true },
            function (err, data) {
              console.log(err);
            }
          );
        })
      }
    },
    createBOL: {
      type: ShipmentType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        pdf: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve(parent, args) { 
        return Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "billInstruction.pdf": args.pdf,
            "billInstruction.status": BOL_STATUS[3],
          } },
          { new: true },
          function (err, data) {
            console.log(err);
          }
        );
      }
    },
    createInvoice: {
      type: InvoiceType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        pdf: {
          type: new GraphQLNonNull(GraphQLString)
        }, 
        invoice: {
          type: new GraphQLNonNull(InvoiceInputType)
        }
      },
      resolve(parent, args) { 
        const invoice = new Invoice(args.invoice);
        return invoice.save(function(err, savedInvoice) {
          Shipment.findOneAndUpdate(
            {_id: args.shipmentId},
            { $set: { 
                invoice: { 
                  form: savedInvoice,
                  pdf: args.pdf, 
                  status: INVOICE_STATUS[1],
                },
              } 
            },
            { new: true },
            function (err, data) {
              console.log(err);
            }
          );
        })
      }
    },
    rollShipment: {
      type: ShipmentType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        newScheduleId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) { 
        return Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { schedule: mongoose.Types.ObjectId(args.newScheduleId) } },
          { new: true },
          function (err, data) {
            console.log(err);
          }
        );
      }
    },
    cancelShipment: {
      type: ShipmentType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve(parent, args) { 
        return Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "bookingRequest.status": BOOKING_STATUS[BOOKING_STATUS.length - 1],
            "billInstruction.status": BOL_STATUS[BOL_STATUS.length - 1],
            "invoice.status": INVOICE_STATUS[INVOICE_STATUS.length - 1],
          } },
          { new: true },
          function (err, data) {
            console.log(err);
          }
        );
      }
    },
  }
})

module.exports = Mutation;
