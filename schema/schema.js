const graphql = require('graphql');

const Route = require('../models/Route');
const { 
  RouteType,
  QuoteInputType
 } = require('./types');
 
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
    routes: {
      type: new GraphQLList(RouteType),
      resolve(parent, args) {
        return Route.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRoute: {
      type: RouteType,
      args: {
          routeId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          quoteHistory: {
            type: new GraphQLList(QuoteInputType)
          },
          startLocation: {
            type: new GraphQLNonNull(GraphQLString)
          },
          endLocation: {
            type: new GraphQLNonNull(GraphQLString)
          },
          carrier: {
            type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve(parent, args) {
          let route = new Route({
              routeId: args.routeId,
              quoteHistory: args.quoteHistory,
              startLocation: args.startLocation,
              endLocation: args.endLocation,
              carrier: args.carrier,
          });
          return route.save();
      }
    },
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});