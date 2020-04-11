import { Contact } from '../entity/Contact'
import { ICommonFilter } from './ICommonFilter'

/**
 * IContactFilter interface
 */
export interface IContactFilter extends ICommonFilter{
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
}

/**
 * IContactResult interface
 */
export interface IContactResult {
    totalCount: number
    contacts: Contact[]
}

/**
 * IContactInput interface
 */
export interface IContactInput {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
}
