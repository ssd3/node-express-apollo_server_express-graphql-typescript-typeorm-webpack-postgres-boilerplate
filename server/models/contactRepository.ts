import {
    DeleteResult,
    EntityRepository,
    FindManyOptions,
    InsertResult,
    Repository,
    UpdateResult
} from 'typeorm'
import { Contact } from '../entity/Contact'
import { IContactFilter, IContactInput, IContactResult } from '../interfaces/IContact'
import { IContext } from '../interfaces/IContext'
import { IDeleteResult } from '../interfaces/IDeleteResult'

/**
 * Contact repository
 */
@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
    /**
     * Get all contact
     * @param filter
     */
    public async getAll(filter: IContactFilter): Promise<IContactResult> {
        const {
            page = 1,
            perPage = 2,
            sortOrder = { id: 'ASC' },
            id,
            firstName,
            lastName,
            email,
            phone,
            sortField
        } = filter

        const findManyOptions: FindManyOptions<Contact> = {
            relations: [],
            order: sortOrder,
            take: perPage,
            skip: (page - 1) * perPage
        }

        const result = await this.findAndCount({
            ...findManyOptions
        })

        return {
            contacts: result[0],
            totalCount: result[1]
        }
    }

    /**
     * Get contact by id
     * @param id
     */
    public async getById(id: number): Promise<Contact | undefined> {
        return await this.findOne(id, { relations: [] })
    }

    /**
     * Get contact by email
     * @param email
     */
    public async getByEmail(email: string): Promise<Contact[]> {
        return await this.find({
            email: email.toLowerCase()
        })
    }

    /**
     * Create and save new contact
     * @param input
     * @param ctx
     */
    public async createAndSave(input: IContactInput, ctx: IContext): Promise<Contact | undefined> {
        const contact: Contact = this.create()
        contact.firstName = input.firstName
        contact.lastName = input.lastName
        contact.email = input.email
        contact.phone = input.phone

        const result: InsertResult = await this.insert(contact)
        if (result.identifiers.length === 0) {
            throw new Error('Contact was not created')
        } else {
            const { id } = result.identifiers[0]
            return await this.getById(id)
        }
    }

    /**
     * Update and save contact
     * @param input
     * @param ctx
     */
    public async updateAndSave(input: IContactInput, ctx: IContext): Promise<Contact | undefined> {
        const result: UpdateResult = await this.update({ id: input.id }, {...input})
        if (result.affected === 0) {
            throw new Error('Contact was not updated')
        } else {
            return await this.getById(Number(input.id))
        }
    }

    /**
     * Delete contact by id
     * @param id
     * @param ctx
     */
    public async deleteContent(id: number, ctx: IContext): Promise<IDeleteResult | undefined> {
        const result: DeleteResult = await this.delete({ id })
        if (result.affected === 0) {
            throw new Error('Contact was not deleted')
        } else {
            return {
                affected: result.affected,
                deletedIds: [id]
            }
        }
    }
}
