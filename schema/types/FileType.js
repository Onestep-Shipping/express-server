const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const FileType = new GraphQLObjectType({
  name: 'FileType',
  fields: () => ({
    filename: {
      type: new GraphQLNonNull(GraphQLString)
    },
    mimetype: {
      type: new GraphQLNonNull(GraphQLString)
    },
    encoding: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

module.exports = FileType;