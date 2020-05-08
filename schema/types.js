const graphql = require('graphql');

const Route = require('../models/Route');

const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const RouteType = new GraphQLObjectType({
  name: 'Route',
  fields: () => ({
    routeId: {
      type: GraphQLString
    },
    quoteHistory: {
      type: new GraphQLList(QuoteType)
    },
    startLocation: {
      type: GraphQLString
    },
    endLocation: {
      type: GraphQLString
    },
    carrier: {
      type: GraphQLString
    },
  })
});

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    validity: {
      type: GraphQLString
    },
  })
});

const QuoteInputType = new GraphQLInputObjectType({
  name: 'QuoteInput',
  fields: () => ({
    validity: {
      type: GraphQLString
    },
  })
});

module.exports = { RouteType, QuoteInputType }