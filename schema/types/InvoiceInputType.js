const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const InvoiceInputType = new GraphQLInputObjectType({
  name: 'InvoiceInputType',
  fields: () => ({
    pdf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLList(GraphQLFloat)
    },
    total: {
      type: new GraphQLList(GraphQLFloat)
    },
    subTotal: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  })
});

module.exports = InvoiceInputType;