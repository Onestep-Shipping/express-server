const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const InvoiceInputType = new GraphQLInputObjectType({
  name: 'InvoiceInputType',
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

module.exports = InvoiceInputType;