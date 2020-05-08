const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    validity: {
      type: new GraphQLNonNull(ValidityType)
    },
    buying: {
      type: new GraphQLNonNull(FeeType)
    },
    selling: {
      type: new GraphQLNonNull(FeeType)
    },
    except: {
      type: GraphQLString
    }
  })
});

const ValidityType = new GraphQLObjectType({
  name: 'ValidityType',
  fields: {
    startDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    endDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
  }
});

const ContainerAndPriceType = new GraphQLObjectType({
  name: 'ContainerAndPriceType',
  fields: {
    containerType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  }
});

const FeeType = new GraphQLObjectType({
  name: 'FeeType',
  fields: {
    oceanFreight: {
      type: new GraphQLList(ContainerAndPriceType)
    },
    docFee: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    adminFee: {
      type: new GraphQLNonNull(GraphQLFloat)
    }
  }
});

module.exports = QuoteType;