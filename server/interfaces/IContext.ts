import { ITokenStoredData } from './ITokenStoredData'

/**
 * IContext interface
 */
export interface IContext extends ITokenStoredData {
  /**
   * JWT token
   */
  jwtToken?: string
}
