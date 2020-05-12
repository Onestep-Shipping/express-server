const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const AddressInputType = require('./AddressInputType.js');

const BookingConfirmationInputType = new GraphQLObjectType({
  name: 'BookingConfirmationInputType',
  fields: () => ({
    timeReceived: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    pdf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    bookingNo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    etd: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    eta: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    terminaCutoff: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
    docCutoff: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
    vgmCutoff: {
      type: new GraphQLNonNull(GraphQLDateTime)
    },
    pickUpLocation: {
      type: new GraphQLNonNull(AddressInputType)
    },
    returnLocation: {
      type: new GraphQLNonNull(AddressInputType)
    },
  })
});

module.exports = BookingConfirmationInputType;