import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
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

server.use(express.json())
server.use('/api/products', router)

server.get('/api', (req, res) => {
  res.json({ msg: 'Desde API' })
})

// Aqui se coloca la configuración, luego de swaggerSpec
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions))


export default server