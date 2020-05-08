const graphql = require('graphql');

const Route = require('../models/Route');

const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');


const RouteType = new GraphQLObjectType({
  name: 'Route',
  fields: () => ({
    routeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    quoteHistory: {
      type: new GraphQLList(QuoteType)
    },
    startLocation: {
      type: new GraphQLNonNull(GraphQLString)
    },
    endLocation: {
      type: new GraphQLNonNull(GraphQLString)
    },
    carrier: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

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

const QuoteInputType = new GraphQLInputObjectType({
  name: 'QuoteInput',
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
  RouteType, 
  QuoteType, 
  QuoteInputType,
  ValidityInputType,
  FeeInputType
}