import 'dotenv/config'
import 'reflect-metadata'
import dbConfig from './dbconfig'
import { createConnection, getConnectionManager } from 'typeorm'
import App from './app'
import StartController from './controllers/StartController'

/**
 * Entry point
 */
declare const module: any
(
    async () => {
        try {
            if (!getConnectionManager().has('default')) {
                await createConnection(dbConfig)
            }

            const app = new App([
                new StartController()
            ])
            app.listen()

            if (module.hot) {
                module.hot.accept()
                module.hot.dispose(() => app.getHttpServer().close())
            }
        } catch (e) {
            console.log('Cannot connect to db', e)
        }
    }
)()
