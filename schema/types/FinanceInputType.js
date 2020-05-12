const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const FinanceInputType = new GraphQLInputObjectType({
  name: 'FinanceInputType',
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

module.exports = FinanceInputType;