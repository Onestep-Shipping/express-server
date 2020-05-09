const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const AddressType = require('./AddressType.js');

const BookingConfirmationType = new GraphQLObjectType({
  name: 'BookingConfirmationType',
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
      type: new GraphQLNonNull(AddressType)
    },
    returnLocation: {
      type: new GraphQLNonNull(AddressType)
    },
  })
});

module.exports = BookingConfirmationType;