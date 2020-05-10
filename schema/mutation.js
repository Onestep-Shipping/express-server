const graphql = require('graphql');

const Route = require('../models/Route');
const Quote = require('../models/Quote');
const Schedule = require('../models/Schedule');

const { 
  QuoteType,
  QuoteInputType,
  ValidityInputType,
  FeeInputType,
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
  }
})

module.exports = Mutation;