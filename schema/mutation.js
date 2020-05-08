const graphql = require('graphql');

const Quote = require('../models/Quote');

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
  GraphQLList,
  GraphQLNonNull
} = graphql;

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

module.exports = Mutation;