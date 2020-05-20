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
  BookingRequestType,
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
      type: GraphQLString,
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
      async resolve(parent, args) { 
        const quote = new Quote(args.quote);
        const savedQuote = await quote.save().catch(() => {
          console.log("addQuoteToSchedules: error in saving quote");
        });
        const updatedRoute = await Route.findOneAndUpdate(
          { routeId: args.routeId, carrier: args.carrier },
          { $push: { quoteHistory: savedQuote } },
          { new: true }
        ).exec().catch(() => {
          console.log("addQuoteToSchedules: error in adding quote to route");
        });
        if (savedQuote !== null && updatedRoute !== null) {
          return "OK";
        }
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
      async resolve(parent, args) { 
        let bookingRequest = new BookingRequest(args.bookingRequest);
        const savedBookingRequest = await bookingRequest.save().catch(() => {
          console.log("createBookingRequestAndInitShipment: error in saving booking request");
        });
        const foundQuote = await Quote.findById(args.quoteId).exec().catch(() => {
          console.log("createBookingRequestAndInitShipment: error in searching quote");
        });

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
            tempCost: calculateCost(foundQuote.buying, bookingRequest.containers)
          },
        })

        const savedShipment = await shipment.save().catch(() => {
          console.log("createBookingRequestAndInitShipment: error in saving shipment");
        });
        const updatedCompany = await Company.findOneAndUpdate(
          { _id: args.companyId },
          { $push: { shipments: savedShipment } },
          { new: true }
        ).exec().catch(() => {
          console.log("createBookingRequestAndInitShipment: error in adding shipment to company");
        });
        
        if (savedShipment !== null && updatedCompany !== null) {
          return "OK";
        }
      }
    },
    createBookingConfirmation: {
      type: GraphQLString,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        bookingConfirmation: {
          type: new GraphQLNonNull(BookingConfirmationInputType)
        }
      },
      async resolve(parent, args) { 
        const bookingConfirmation = new BookingConfirmation(args.bookingConfirmation);
        const savedBookingConfirmation = await bookingConfirmation.save().catch(() => {
          console.log("createBookingConfirmation: error in saving booking confirmation");
        });
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "bookingRequest.confirmation": savedBookingConfirmation,
            "bookingRequest.status": BOOKING_STATUS[1],
            "billInstruction.status": BOL_STATUS[1]
          } },
          { new: true }
        ).exec().catch(() => {
          console.log("createBookingConfirmation: error in adding booking confirmation to shipment");
        });
        if (savedBookingConfirmation !== null && updatedShipment !== null) {
          return "OK";
        }
      }
    },
    createBillInstruction: {
      type: GraphQLString,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        billInstruction: {
          type: new GraphQLNonNull(BillInstructionInputType)
        }
      },
      async resolve(parent, args) { 
        const billInstruction = new BillInstruction(args.billInstruction);
        const savedBillInstruction = await billInstruction.save().catch(() => {
          console.log("createBillInstruction: error in saving bill instruction");
        });
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "billInstruction.form": savedBillInstruction,
            "billInstruction.status": BOL_STATUS[2],
          } },
          { new: true }
        ).catch(() => {
          console.log("createBillInstruction: error in adding bill instruction to shipment");
        });
        if (savedBillInstruction !== null && updatedShipment !== null) {
          return "OK";
        }
      }
    },
    createBOL: {
      type: GraphQLString,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        pdf: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      async resolve(parent, args) { 
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "billInstruction.pdf": args.pdf,
            "billInstruction.status": BOL_STATUS[3],
          } },
          { new: true }
        ).exec().catch(() => {
          console.log("createBOL: error in adding BOL link to shipment");
        });
        if (updatedShipment !== null) {
          return "OK";
        }
      }
    },
    createInvoice: {
      type: GraphQLString,
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
      async resolve(parent, args) { 
        const invoice = new Invoice(args.invoice);
        const savedInvoice = await invoice.save().catch(() => {
          console.log("createInvoice: error in saving invoice");
        });
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
              invoice: { 
                form: savedInvoice,
                pdf: args.pdf, 
                status: INVOICE_STATUS[1],
              },
            } 
          }
        ).exec().catch(() => {
          console.log("createInvoice: error in adding invoice to shipment");
        });
        if (savedInvoice !== null && updatedShipment !== null) {
          return "OK";
        }
      }
    },
    rollShipment: {
      type: GraphQLString,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        newScheduleId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) { 
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { schedule: mongoose.Types.ObjectId(args.newScheduleId) } },
          { new: true },
        ).exec().catch(() => {
          console.log("rollShipment: error in rolling shipment");
        });

        if (updatedShipment !== null) {
          return "OK";
        }
      }
    },
    cancelShipment: {
      type: GraphQLString,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      async resolve(parent, args) { 
        const updatedShipment = await Shipment.findOneAndUpdate(
          {_id: args.shipmentId},
          { $set: { 
            "bookingRequest.status": BOOKING_STATUS[BOOKING_STATUS.length - 1],
            "billInstruction.status": BOL_STATUS[BOL_STATUS.length - 1],
            "invoice.status": INVOICE_STATUS[INVOICE_STATUS.length - 1],
          } },
          { new: true }
        ).exec().catch(() => {
          console.log("cancelShipment: error in cancelling shipment");
        });

        if (updatedShipment !== null ) {
          return "OK";
        }
      }
    },
  }
})

module.exports = Mutation;
