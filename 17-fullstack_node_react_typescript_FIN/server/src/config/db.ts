import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

// Carga las variables de entorno del archivo .env
dotenv.config()

// Conexión a la base de datos con Sequelize, el ORM de Node.js, requiere la URL de la base de datos y un objeto de configuración

// Observa que la URL de la base de datos se obtiene del archivo .env con la variable DATABASE_URL (se utiliza un operador de negación ! para indicar que la variable no es nula)
const db = new Sequelize(process.env.DATABASE_URL!, {
    // Especifica el directorio de modelos para generar las  tablas y columnas en la base de datos, puedes especificar multiples directorios

    // __dirname es una variable global de Node.js que contiene la ruta del archivo actual
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})

// Exporta la conexión a la base de datos
export default db