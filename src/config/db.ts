import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db