const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const FinanceType = new GraphQLObjectType({
  name: 'FinanceType',
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

module.exports = FinanceType;