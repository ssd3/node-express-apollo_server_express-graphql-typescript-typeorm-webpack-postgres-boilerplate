import { IResolvers } from 'graphql-tools'
import { Queries as contactQueries, Mutations as contactMutations } from './contact'

/**
 * Combine all GraphQL queries, mutations and subscriptions
 */
const resolvers: IResolvers = {
    Query: {
        ...contactQueries
    },
    Mutation: {
        ...contactMutations
    }
}

export default resolvers
