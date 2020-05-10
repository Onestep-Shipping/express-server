const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');
const Shipment = require('../models/Shipment');
const Company = require('../models/Company');

const { 
  RouteType,
  QuoteType,
  ScheduleType,
  ShipmentType,
  CompanyType
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
        return Company.find({});
      }
    },
    getScheduleIds: {
      type: new GraphQLList(GraphQLString),
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
        }).then(route => {
          return Schedule.find({
            route: route._id,
            startDate: { $gte: args.startDate, $lte: args.endDate }
          })
          .distinct('_id', function(error, ids) {
              return ids;
          });
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
        }).then(route => {
          return Schedule.find({
            route: route._id,
            startDate: { $gte: args.startDate, $lte: args.endDate }
          })
          .populate('route')
          .sort({transshipment: 1, startDate: 1});
        })
      }
    },
  }
});

module.exports = RootQuery;