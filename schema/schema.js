const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');

const { 
  RouteType,
  QuoteType,
  QuoteInputType,
  ValidityInputType,
  FeeInputType,
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
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return Quote.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addQuote: {
      type: QuoteType,
      args: {
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
        return quote.save();
      }
    },
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});