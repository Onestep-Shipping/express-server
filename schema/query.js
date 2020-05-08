const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');

const { 
  RouteType,
  QuoteType,
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
    routes: {
      type: new GraphQLList(RouteType),
      resolve(parent, args) {
        return Route.find({});
      }
    },
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return Quote.find({});
      }
    },
  }
});

module.exports = RootQuery;