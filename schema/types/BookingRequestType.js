const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookingRequestType = new GraphQLObjectType({
  name: 'BookingRequestType',
  fields: () => ({
    commodity: {
      type: new GraphQLNonNull(GraphQLString)
    },
    hsCode: {
      type: new GraphQLNonNull(GraphQLString)
    },
    containers: {
      type: new GraphQLList(ContainerAndQuantityType)
    },
    paymentTerm: {
      type: new GraphQLNonNull(GraphQLString)
    },
    autoFilling: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
  })
});

const ContainerAndQuantityType = new GraphQLObjectType({
  name: 'ContainerAndQuantityType',
  fields: () => ({
    container: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

module.exports = BookingRequestType;