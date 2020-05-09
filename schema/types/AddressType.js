const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const AddressType = new GraphQLObjectType({
  name: 'AddressType',
  fields: () => ({
    street: {
      type: new GraphQLNonNull(GraphQLString)
    },
    city: {
      type: new GraphQLNonNull(GraphQLString)
    },
    country: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

module.exports = AddressType;