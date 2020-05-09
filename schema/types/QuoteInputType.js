const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const QuoteInputType = new GraphQLInputObjectType({
  name: 'QuoteInputType',
  fields: () => ({
    validity: {
      type: new GraphQLNonNull(ValidityInputType)
    },
    buying: {
      type: new GraphQLNonNull(FeeInputType)
    },
    selling: {
      type: new GraphQLNonNull(FeeInputType)
    },
    except: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const ValidityInputType = new GraphQLInputObjectType({
  name: 'ValidityInputType',
  fields: {
    startDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    endDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
  }
});

const ContainerAndPriceInputType = new GraphQLInputObjectType({
  name: 'ContainerAndPriceInputType',
  fields: {
    containerType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  }
});

const FeeInputType = new GraphQLInputObjectType({
  name: 'FeeInputType',
  fields: {
    oceanFreight: {
      type: new GraphQLList(ContainerAndPriceInputType)
    },
    docFee: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    adminFee: {
      type: new GraphQLNonNull(GraphQLFloat)
    }
  }
});

module.exports = { 
  QuoteInputType,
  ValidityInputType,
  FeeInputType
} 
