import { getCustomRepository } from 'typeorm'
import { GraphQLResolveInfo } from 'graphql'
import { Contact } from '../entity/Contact'
import { IContactResult } from '../interfaces/IContact'
import { IDeleteResult } from '../interfaces/IDeleteResult'
import { IContext } from '../models'
import { ContactRepository } from '../models/contactRepository'

/**
 * Queries (Contact graphql)
 */
export const Queries = {
    /**
     * Contents GraphQL resolver: get contacts by filter criteria
     * @param _
     * @param filter
     * @param ctx
     * @param info
     */
    async contacts(_: void, {filter}, ctx: IContext, info: GraphQLResolveInfo): Promise<IContactResult> {
        return getCustomRepository(ContactRepository).getAll(filter)
    },
    /**
     * Contact GraphQL resolver: get contact by id
     * @param _
     * @param id
     * @param ctx
     * @param info
     */
    async contact(_: void, id: number, ctx: IContext, info: GraphQLResolveInfo): Promise<Contact | undefined> {
        return getCustomRepository(ContactRepository).getById(id)
    }
}

/**
 * Mutations (Contact graphql)
 */
export const Mutations = {
    /**
     * Contact GraphQL resolver: create new contact
     * @param _
     * @param input
     * @param ctx
     * @param info
     */
    async contactCreate(_: void, { input }, ctx: IContext, info: GraphQLResolveInfo): Promise<Contact | undefined> {
        return await getCustomRepository(ContactRepository).createAndSave(input, ctx)
    },
    /**
     * Contact GraphQL resolver: update exists contact
     * @param _
     * @param input
     * @param ctx
     * @param info
     */
    async contactUpdate(_: void, { input }, ctx: IContext, info: GraphQLResolveInfo): Promise<Contact | undefined> {
        return await getCustomRepository(ContactRepository).updateAndSave(input, ctx)
    },
    /**
     * Contact GraphQL resolver: delete exists contact
     * @param _
     * @param id
     * @param ctx
     * @param info
     */
    async contactDelete(_: void, { id }, ctx: IContext, info: GraphQLResolveInfo): Promise<IDeleteResult | undefined> {
        return await getCustomRepository(ContactRepository).deleteContent(id, ctx)
    }
}
