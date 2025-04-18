import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUIOptions } from './config/swagger';

export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar la BD"))
  }
}

connectDB()
const server = express()

const corsOptions: CorsOptions = {

  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}

server.use(cors(corsOptions))

server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

server.get('/api', (req, res) => {
  res.json({ msg: 'Desde API' })
})

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions))


export default server