import { ApolloServer } from 'apollo-server-express'
import compression from 'compression'
import express from 'express'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import depthLimit from 'graphql-depth-limit'
import IController from './interfaces/IController'
import errorMiddleware from './middleware/error'
import cors from 'cors'
import path from 'path'
import os from 'os'
import favicon from 'serve-favicon'
import schema from './schema'

/**
 * Express application class
 */
class App {
    public app: express.Application
    public apolloServer: ApolloServer
    public httpServer: any

    /**
     * ctor
     * @param controllers
     */
    constructor(controllers: IController[]) {
        this.app = express()
        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
        this.apolloServer = this.initializeApolloServer()
    }

    /**
     * Create http-server listener
     */
    public listen() {
        const host = os.hostname()
        this.httpServer = this.app.listen(process.env.PORT,
            () => {
                console.log(`Application http://${host}:${process.env.PORT}`)
                console.log(`🚀GraphQL http://${host}:${process.env.PORT}${this.apolloServer.graphqlPath}`)
        })
    }

    /**
     * Get app instance
     */
    public getApp() {
        return this.app
    }

    /**
     * Get Apollo Graphql server instance
     */
    public getApolloServer() {
        return this.apolloServer
    }

    /**
     * Get http-server instance
     */
    public getHttpServer() {
        return this.httpServer
    }

    /**
     * Init express application middleware
     */
    private initializeMiddleware() {
        this.app.set('view engine', 'pug')
        this.app.set('views', path.join(path.resolve(), 'server', 'views'))
        this.app.use(express.static(path.join(path.resolve(), 'server', 'public'), { maxAge: 31557600000 }))
        this.app.use(favicon(path.join(path.resolve(), 'server', 'public', 'images', 'favicon.png')))

        this.app.use(compression())
        this.app.use(bodyParser.json({ limit: '1mb'}))
        this.app.use(bodyParser.urlencoded({ extended: true }))

        this.app.use('*', cors())
        this.app.use(cookieParser())
    }

    /**
     * Init error handling
     */
    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    /**
     * Init controllers
     * @param controllers
     */
    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }

    /**
     * Init Apollo GraphQL server
     */
    private initializeApolloServer() {
        const apolloServer = new ApolloServer({
            debug: process.env.APOLLO_SERVER_DEBUG === 'true',
            introspection: process.env.APOLLO_SERVER_INTROSPECTION === 'true',
            formatError: (error) => {
                return new Error(error.message)
            },
            schema,
            validationRules: [depthLimit(7)],
            context: ({ req, connection }) => {
                if (connection) {
                    return connection.context
                } else {
                    return {
                        userId: '',
                        isSuperuser: true,
                        groups: []
                    }
                }
            },
            subscriptions: {
                //
            }
        })

        apolloServer.applyMiddleware({
            app: this.app,
            path: '/api'
        })

        return apolloServer
    }
}

export default App
