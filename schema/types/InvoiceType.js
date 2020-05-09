const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const InvoiceType = new GraphQLObjectType({
  name: 'InvoiceType',
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

module.exports = InvoiceType;