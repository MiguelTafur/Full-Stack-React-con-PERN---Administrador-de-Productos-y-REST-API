import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db