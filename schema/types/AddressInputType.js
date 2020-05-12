const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInputType',
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

module.exports = AddressInputType;