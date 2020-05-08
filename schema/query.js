const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');

const { 
  RouteType,
  QuoteType,
  ScheduleType,
} = require('./types/index.js');

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
    route: {
      type: RouteType,
      args: {
        routeId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        carrier: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve(parent, args) {
        return Route.findOne({ 
          routeId: args.routeId,
          carrier: args.carrier
        });
      }
    },
    routes: {
      type: new GraphQLList(RouteType),
      resolve(parent, args) {
        return Route.find({}).populate('quoteHistory');
      }
    },
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return Quote.find({});
      }
    },
    schedules: {
      type: new GraphQLList(ScheduleType),
      resolve(parent, args) {
        return Schedule.find({})
          .populate('route')
          .sort({transshipment: 1, startDate: 1});
      }
    },
  }
});

module.exports = RootQuery;