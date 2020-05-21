const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');
const Shipment = require('../models/Shipment');
const Company = require('../models/Company');
const BookingRequest = require('../models/BookingRequest');
const BillInstruction = require('../models/BillInstruction');

const { 
  RouteType,
  QuoteType,
  ScheduleType,
  ShipmentType,
  CompanyType,
  BillInstructionType,
} = require('./types/index.js');

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;
 

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllCompanies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return Company.find({}).populate("shipments");
      }
    },
    getMyShipments: {
      type: new GraphQLList(ShipmentType),
      args: {
        companyId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        return Shipment.find({ bookedBy: args.companyId })
          .populate({ 
            path: 'schedule',
            populate: {
              path: 'route',
            }
          })
          .populate('bookingRequest.confirmation')
          .sort({ "createdAt": -1})
      }
    },
    getBillForm: {
      type: BillInstructionType,
      args: {
        shipmentId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        const foundShipment = await Shipment.findById(args.shipmentId)
          .populate('billInstruction.form')
          .exec();
        return foundShipment.billInstruction.form;
      }
    },
    getQuoteHistory: {
      type: new GraphQLList(QuoteType),
      args: {
        routeId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        carrier: {
          type: new GraphQLNonNull(GraphQLString)
        },
        startDate: {
          type: new GraphQLNonNull(GraphQLDate)
        },
        endDate: {
          type: new GraphQLNonNull(GraphQLDate)
        },
      },
      resolve(parent, args) {
        return Route.findOne({ 
          routeId: args.routeId,
          carrier: args.carrier
        })
        .populate('quoteHistory')
        .then(route => {
          return route.quoteHistory
        })
      }
    },
    findSchedules: {
      type: new GraphQLList(ScheduleType),
      args: {
        routeId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        carrier: {
          type: new GraphQLNonNull(GraphQLString)
        },
        startDate: {
          type: new GraphQLNonNull(GraphQLDate)
        },
        endDate: {
          type: new GraphQLNonNull(GraphQLDate)
        },
      },
      resolve(parent, args) {
        return Route.findOne({ 
          routeId: args.routeId,
          carrier: args.carrier
        })
        .then(route => {
          return Schedule.find({
            route: route._id,
            startDate: { $gte: args.startDate, $lte: args.endDate }
          })
          .populate({ 
            path: 'route',
            populate: {
              path: 'quoteHistory',
            } 
          })
          .sort({transshipment: 1, startDate: 1});
        })
      }
    },
    getAllShipments: {
      type: new GraphQLList(ShipmentType),
      args: {
        sortBy: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve(parent, args) {
        return Shipment.find({})
          .populate({ 
            path: 'schedule',
            populate: {
              path: 'route',
              populate: {
                path: 'quoteHistory'
              }
            } 
          })
          .populate('bookedBy')
          .populate('bookingRequest.form')
          .populate('bookingRequest.confirmation')
          .populate('billInstruction.form')
          .sort({ [args.sortBy + ".form"]: -1 })
          .exec();
      }
    },
  }
});

module.exports = RootQuery;