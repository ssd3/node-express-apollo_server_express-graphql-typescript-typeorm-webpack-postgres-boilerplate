import { Router } from 'express'

/**
 * IController interface: base for all controllers
 */
interface IController {
    /**
     * URL path
     */
    path: string
    /**
     * Express application router object
     */
    router: Router
}

export default IController
