const { mergeResolvers } = require('merge-graphql-schemas');
const user = require('./user');
const resolvers = [ user ]
module.exports = mergeResolvers(resolvers);