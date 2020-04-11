import 'graphql-import-node'
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'
import typeDefs from './typedefs'

/**
 * Apollo GraphQL schema (resolvers, typedefs, directives) registration
 */
const schema: GraphQLSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
  schemaDirectives: {}
})

export default schema
