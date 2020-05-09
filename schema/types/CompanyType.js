const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AddressType = require('./AddressType.js');
const ShipmentType = require('./ShipmentType.js');

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
      type: new GraphQLList(ShipmentType)
    },
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