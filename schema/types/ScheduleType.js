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

const RouteType = require('./RouteType.js');

const ScheduleType = new GraphQLObjectType({
  name: 'ScheduleType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    route: {
      type: new GraphQLNonNull(RouteType)
    },
    startDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    endDate: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    transitTime: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    transshipment: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    vessels: {
      type: new GraphQLList(GraphQLString)
    },
  })
});

module.exports = ScheduleType;