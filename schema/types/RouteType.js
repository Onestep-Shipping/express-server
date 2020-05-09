const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const QuoteType = require('./QuoteType.js');

const RouteType = new GraphQLObjectType({
  name: 'RouteType',
  fields: () => ({
    routeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quoteHistory: {
      type: new GraphQLList(QuoteType)
    },
    startLocation: {
      type: new GraphQLNonNull(GraphQLString)
    },
    endLocation: {
      type: new GraphQLNonNull(GraphQLString)
    },
    carrier: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

module.exports = RouteType;