const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookingRequestInputType = new GraphQLInputObjectType({
  name: 'BookingRequestInputType',
  fields: () => ({
    commodity: {
      type: new GraphQLNonNull(GraphQLString)
    },
    hsCode: {
      type: new GraphQLNonNull(GraphQLString)
    },
    containers: {
      type: new GraphQLList(ContainerAndQuantityInputType)
    },
    paymentTerm: {
      type: new GraphQLNonNull(GraphQLString)
    },
    autoFilling: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
  })
});

const ContainerAndQuantityInputType = new GraphQLInputObjectType({
  name: 'ContainerAndQuantityInputType',
  fields: () => ({
    containerType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

module.exports = BookingRequestInputType;