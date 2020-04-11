import express, { Request, Response, NextFunction as Next} from 'express'
import IController from '../interfaces/IController'

/**
 * Start controller
 */
class StartController implements IController {
    public path = '*'
    public router = express.Router()

    /**
     * ctor
     */
    constructor() {
        this.initializeRoutes()
    }

    /**
     * Init Start controller routes
     */
    private initializeRoutes() {
        this.router.get(`${this.path}`, this.requestHandler)
    }

    /**
     * Start route handling
     * @param request
     * @param response
     * @param next
     */
    private requestHandler = async (request: Request, response: Response, next: Next) => {
        if (request.url === '/api') {
            next()
            return
        }

        response.send('Web application')
    }
}

export default StartController
