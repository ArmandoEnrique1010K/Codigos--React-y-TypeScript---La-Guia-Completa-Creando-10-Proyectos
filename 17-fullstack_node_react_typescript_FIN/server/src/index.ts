// Importa la función sumar desde el archivo server.ts
// import { sumar } from "./server"

// Importa el paquete colors para los mensajes de consola
import colors from 'colors'

// Importa el modulo server
import server from './server'

// Imprime un mensaje en la consola de la terminal
// console.log("Desde index.ts")

// Llama a la función sumar
// sumar()

// Crea una constante port que obtiene el puerto del archivo .env o el puerto 4000
const port = process.env.PORT || 4000

// Nota: Algunos servicios en la nube como Heroku, Netlify, Vercel, etc. asignan un puerto automáticamente, por lo que es importante tener un archivo .env con la variable PORT para que el servidor pueda funcionar correctamente.


// Inicia el servidor en el puerto 4000
server.listen(port, () => {
    // Imprime un mensaje de color cyan en la consola de la terminal
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})