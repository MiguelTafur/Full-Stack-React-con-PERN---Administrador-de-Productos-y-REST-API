import express from 'express'
import cors, { CorsOptions } from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import router from './router'
import db from './config/db'
import morgan from 'morgan'

// Conectar a base de datos
export async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold('Conexión exitosa a la DB'))
    } catch (error) {
        // console.log(error)
        // console.log(colors.red.bold('Hubo un error al conectas la BD'))
        console.log('Unable to connect to the database:', error)
    }
}

conectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

server.use(morgan('dev'))

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server