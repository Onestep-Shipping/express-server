const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const AddressType = require('./AddressType.js');

const BillInstructionInputType = new GraphQLInputObjectType({
  name: 'BillInstructionInputType',
  fields: () => ({
    shipper: {
      type: new GraphQLNonNull(GraphQLString)
    },
    consignee: {
      type: new GraphQLNonNull(GraphQLString)
    },
    notify: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    containers: {
      type: new GraphQLList(ContainerInfoInputType)
    },
    orderNo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    hsCode: {
      type: new GraphQLNonNull(GraphQLString)
    },
    caedNo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    cargoValue: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const ContainerInfoInputType = new GraphQLInputObjectType({
  name: 'ContainerInfoInputType',
  fields: () => ({
    containerNo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    seelNo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    weight: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    measurement: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    vgm: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  })
});

module.exports = BillInstructionInputType;