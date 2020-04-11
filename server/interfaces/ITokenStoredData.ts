/**
 * ITokenStoredData interface
 */
export interface ITokenStoredData {
    /**
     * Current user ID
     */
    userId: number,
    /**
     * Superuser flag
     */
    isSuperuser: boolean,
    /**
     * Groups / roles for current user
     */
    groups: string[]
}
