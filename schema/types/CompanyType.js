const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const AddressType = require('./AddressType.js');

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      type: new GraphQLNonNull(AddressType)
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString)
    },
    taxId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    personInCharge: {
      type: new GraphQLNonNull(PersonInChargeType)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    shipments: {
      type: new GraphQLList(require('./ShipmentType.js')) // To prevent circular dependencies problem between Company and Shipments
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime)
    }
  })
});

const PersonInChargeType = new GraphQLObjectType({
  name: 'PersonInChargeType',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    position: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

module.exports = CompanyType;