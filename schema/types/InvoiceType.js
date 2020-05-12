const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const InvoiceType = new GraphQLObjectType({
  name: 'InvoiceType',
  fields: () => ({
    cost: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    revenue: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    profit: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  })
}); 

module.exports = InvoiceType;