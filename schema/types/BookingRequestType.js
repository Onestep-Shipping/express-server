const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

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
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDateTime)
    }
  })
});

const ContainerAndQuantityType = new GraphQLObjectType({
  name: 'ContainerAndQuantityType',
  fields: () => ({
    containerType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

module.exports = BookingRequestType;