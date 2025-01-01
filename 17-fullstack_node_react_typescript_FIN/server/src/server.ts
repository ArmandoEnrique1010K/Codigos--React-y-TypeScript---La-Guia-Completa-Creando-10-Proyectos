import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

// Función de prueba exportable para sumar 2 numeros
// export function sumar() {
//     console.log(4 + 4)
// }

// Conectar a base de datos
export async function connectDB() {
    try {
        // authenticate sirve para verificar la conexión a la BD
        await db.authenticate()
        // sync sirve para crear las tablas en la BD y aplica cualquier cambio en los modelos
        db.sync()
        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        // Mensaje de error en caso de no poder conectar a la BD
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}

// Llama a la función connectDB
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
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

// Leer datos de formularios, el metodo json() habilita la conversión de los datos a JSON
server.use(express.json())

server.use(morgan('dev'))

// Puedes definir una ruta base para todas las rutas, que empiecen con /api/products
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

// Exporta el servidor
export default server