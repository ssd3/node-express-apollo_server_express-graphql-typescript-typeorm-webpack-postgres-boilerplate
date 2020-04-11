import { ConnectionOptions } from 'typeorm'
import { Contact } from './entity/Contact'

/**
 * DB configuration
 */
const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false,
    entities: // ['entity/*.js', 'entity/*.ts'],
        [
            Contact
    ],
    synchronize: false,
    migrationsTableName: 'custom_migration_table',
    migrations: ['migration/*.js', 'migration/*.ts'],
    subscribers: ['subscriber/*.js', 'subscriber/*.ts'],
    cli: {
        migrationsDir: 'migration',
        subscribersDir: 'server/subscriber'
    },
    maxQueryExecutionTime: 5000
    // , logging: ['query', 'error']
}

export default dbConfig
