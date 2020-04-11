/**
 * ICommonFilter
 */
export interface ICommonFilter {
    /**
     * Current page
     */
    page?: number
    /**
     * Items per page
     */
    perPage?: number
    /**
     * Sort field
     */
    sortField?: string
    /**
     * Sort order
     */
    sortOrder?: object
}
