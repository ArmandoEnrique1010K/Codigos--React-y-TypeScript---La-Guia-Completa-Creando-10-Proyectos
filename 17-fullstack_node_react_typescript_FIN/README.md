# APP FULLSTACK

## REST API's

### ¿Qué es una REST API ?

- Es un conjunto de reglas que permiten que aplicaciones se comuniquen entre sí a través de la web.

- REST = Representational State Transfer

- Puede ser diseñada en cualquier lenguaje

- Debe responder a los Request HTTP: GET, POST, PUT, PATCH, DELETE

- Tiene una forma ordenada y estructurada de poner a disposición los recursos de una base de datos

### Verbos HTTP

- GET - Obtener datos

- POST - Enviar datos / Creación

- PUT / PATCH - Actualización

- DELETE - Eliminar

### Endpoints de una REST API

Una REST API cuanta con varios endpoints (o URLs) para hacer operaciones CRUD. Ejemplo:

- Listar todos los clientes: 
  
  - GET   /clientes

- Obtener un solo cliente
  
  - GET   /clientes/10

- Crear un nuevo cliente
  
  - POST   /clientes

- Editar un cliente
  
  - PUT   /clientes/10

- Borrar un cliente
  
  - DELETE   /clientes/8

### Ventajas de una REST API

- Simplicidad de creación

- Es una forma escalable y ordenadad de crear un proyecto

- Facilidad de uso y se pueden consumir en React, Angular, Vue.js, Flutter, Kotlin, Swift, etc.

### Herramientas para crear REST API's

- Cualquier lenguaje de programación que se ejecute en el servidor puede servir para crear una REST API: Python, PHP, Java, C#, etc.

- Muchos frameworks soportan la creación de REST API's y simplifican mucho este proceso entre ellos Laravel, Express, Rails o Django.

- Una base de datos como MySQL, PostgreSQL o MongoDB

## PERN STACK

- Son las iniciales de PostgreSQL - Express - React - Node.js

- Un stack es un conjunto de herramientas para crear una app

- Full Stack quiere decir que puedes crear el Stack completo de una App y PERN Stack te permite hacerlo

- React en el Front End y Node en el backend son una combinación muy común

- Puedes utilizar React con Backends de Django, Rails o Laravel

### PostgreSQL

- Tambien llamado Postgres, es un sistema de gestión de bases de datos relacional orientado a objetos y de código abierto

- Para interactuar con nuestra base de datos podemos hacerlo por medio de un ORM.

- Un ORM tiene todos los métodos para crear, obtener, actualizar y eliminar datos de nuestra base de datos

### Express

- Infraestructura web rápida, minimalista y flexible para Node.js

- A diferencia de Rails o Laravel no tiene un sistema de vistas definido, tampoco ORM o Autenticacion; sino que te deja mucha parte de la configuración en tus manos

- Ideal para utilizarse en Aplicaciones web monoliticas o como API

### Node.js

- Entorno de ejecución en JavaScript que se ejecuta en el servidor

- Entre sus ventajas se encuentra la gran cantidad de librerías disponibles para integrarlas en proyectos con NPM

- Puede consultar base de datos, autenticar usuarios, manejar rutas y mucho más

### Ventajas del stack PERN o MERN

- Separación de backend y frontend

- Comunicación entre backend y frontend con JSON y peticiones HTTP

- NPM con una gran cantidad de dependencias

- Solo codigo de JavaScript / TypeScript para crear aplicaciones Full Stack

## Creando el proyecto REST API

- Crea una carpeta para almacenar el proyecto, establece la ruta de la carpeta desde la terminal powershell o cmd con el comando `cd <<Ruta de la carpeta>>`.

- Ejecuta el comando  `npm init` para generar el archivo `package.json`, establece las siguientes configuraciones:
  
  - Name: `14_rest_api_node`
  
  - Version: `1.0.0`
  
  - Description: `REST API's con Express y TypeScript`
  
  - Entry point:  `index.js`
  
  - Pulsa Enter si aparece las opciones: `test command`, `git repository` y `keywords` para dejarlo en blanco.
  
  - Author: `Juan De la Torre @codigoconjuan`
  
  - Licence: `ISC`
  
  - Cuando aparezca la opción `Is this OK? (yes)` pulsa Enter para generar el archivo `package.json`

### Abrir el proyecto en VSCode

- Arrastra la carpeta `14_rest_api_node` hacia VSCode, crea una carpeta llamada `src` en la raiz del proyecto para colocar el codigo fuente.

- Cuando creas un servidor en Express puedes crearlo como JavaScript y solamente lo subes a algún servidor que soporte Node js y es todo lo que requiere. Sin embargo cuando escribes el código en TypeScript, no puedes subir porque TypeScript no lo soporta ningún servidor; siempre se debe compilar a javascript

- Para ejecutar un archivo, ejecuta el comando `node src/index.ts` desde la terminal de VSCode, en este caso el archivo se llama `index.ts`. Puedes utilizarlo para imprimir los mensajes en consola que se encuentran en ese archivo

### Configuraciones de TypeScript en el proyecto

- Ejecuta el comando `npm i -D typescript ts-node` para instalar las dependencias de desarrollo de TypeScript.

- Por lo general se crean los archivos `index.ts` y `server.js` para establecer el punto de entrada del servidor y las configuraciones del servidor.

- Crea el archivo `tsconfig.json` al mismo nivel en el que se encuentra el archivo `package.json` y luego ejecuta el comando `npx ts-node src/index.ts` para instalar la dependencia de forma global `ts-node` (se debe encontrar en el archivo `package.json`).

- A diferencia de JavaScript que se tenia que definir el `type` en el archivo `package.json` para hacer que todos los modulos sean exportables, en TypeScript no es necesario hacer esa configuración.

```json
{
  "name": "rest_api_node_ts_server",
  "version": "1.0.0",
  "description": "REST API's con Express y Typescript",
  "main": "index.js",
  // No es necesario colocar el type en un servidor desarrollado con TypeScript
  "type": "module"
}
```

## Ejecutar el servidor con Nodemon

- Ejecuta el servidor con el comando `npm run dev`

- Para evitar tener que volver a ejecutar o reiniciar el servidor luego de un cambio en el codigo fuente, puedes optar la dependencia Nodemon. Además Nodemon tambien muestra los errores en la consola

- Ejecuta el comando `npm i -D nodemon` para instalarlo (`-D` significa que se trata de una dependencia de desarrollo)

- Por otro lado el comando `node --watch` sirve para observar los cambios en los archivos, pero solamente funciona con archivos JavaScript.

- Añade la siguiente configuración en el archivo `package.json` para implementarlo

```ts
"scripts": {
    "dev": "nodemon --exec ts-node src/index,ts"
}
```

### Compilar el servidor para producción

- Cuando se utiliza Typescript, se tiene el comando `npx tsc` para compilar el proyecto, de tal manera que convierte los archivos de formato TypeScript a codigo JavaScript puro. 

- Genera una carpeta llamada `dist` en la que se encuentra el código para subirlo a producción. Las reglas estan definidas en el archivo `tsconfig.json`:

```ts
{
    // Configuraciones para el compilador
    "compilerOptions": {
        // Ubicación de la carpeta donde se guardara el proyecto compilado
        "outDir": "./dist",
        // Directorio principal o raiz del proyecto
        "rootDir": "./src",
        // Versión de JavaScript a la que se compilara
        "lib": ["ESNext"],
        // Se recomienda dejarlo como false, si esta en true no permite utilizar un "any" en el codigo
        "strict": false,
        // Genera los archivos map, util cuando se trabaja con debugger
        "sourceMap": true,
        // Permite importar las librerias que estan escritas en common.js para el proyecto (solamente si lo estas utilizando)
        "esModuleInterop": true,
        // Genera los archivos de definición (similar a un type)
        "declaration": true
    },
    // Lista de archivos que se incluiran, en este caso se define todos los archivos de typescript definidos en src
    "include": ["src/**/*.ts"]
}
```

## Express

- Instala express con el comando `npm i express`, seguidamente instala la dependencia de desarrollo de express en un entorno TypeScript con `npm i -D @types/express`

- Coloca el siguiente código en el archivo `index.ts`

```ts
// Importa el modulo server
import server from "./server";

// Puerto del servidor, puede ser cualquier puerto
server.listen(4000, () => {
    console.log(`REST API en el puerto 4000`)
})
```

### Routing en express

- Puedes especificar el endpoint de una pagina utilizando el siguiente codigo:

```ts
// Importa el modulo express y Router
import express, { Router } from "express";

// Instancia de express y router
const server = express()
const router = Router();

// Endpoint para la pagina de inicio (metodo GET)
server.get('/', (req, res) => {
    // Codigo en formato JavaScript

    // Muestra el contenido en la pantalla
    res.json('Desde GET')
})

// Habilita el endpoint para su uso
server.use('/', router)
```

- En este caso, se define la pagina principal (con el metodo get), contiene el endpoint y un callback con 2 parametros: 
  
  - req: Contenido que se envia como los datos de un formulario o un API key.
  
  - res: Respuesta obtenida al visitar la pagina como una consulta a la base de datos.

- El metodo `send` sirve para enviar datos hacia la pantalla, pero puedes optar por el metodo `json` para retornar cualquier información como los datos obtenidos de una base de datos.

### Métodos GET y POST

- Aparte del metodo GET, se tiene diferentes metodos HTTP: POST, PUT, PATCH y DELETE. Pero los navegadores soportan 2 métodos: GET y POST (se utiliza en formularios).

- Normalmente siempre se envia una petición de tipo GET cuando visitas una URL en el navegador, o cuando tratas de obtener datos. Mientras que POST se utiliza en la definición de un formulario.

```html
<form action="/" method="POST"></form>
```

- Para probar los demás metodos puedes utilizar fetch API, axios o una herramienta para probar endpoints como Postman o ThunderClient.

### Postman

- Es una herramienta para probar los demás metodos HTTP. Puedes seleccionar el tipo de request: GET, POST, PUT, etc. 

- Siguiendo con el código, puedes realizar una petición de tipo GET a la URL `http://localhost:4000` y mostrara `Desde GET` en la respuesta (puedes incluir una diagonal al final de la URL).

- Si un endpoint no esta definido, mostrara `Cannot GET /nosotros`, en este caso es el endpoint  `/nosotros`.

### ThunderClient

- Es una alternativa a Postman, pero funciona dentro de VSCode, para instalarlo ve al panel de extensiones de VSCode y busca `Thunder Client`. Una vez instalado aparecera su icono en el panel izquierdo. Su interfaz grafica es bastante similar a la de Postman.

- Puedes realizar una petición a la misma URL `http://localhost:4000` y se obtendrá el mismo resultado.

- Támbien admite los demás métodos HTTP: GET, POST, PUT, DELETE, PATCH, etc.

## ORM (Mapeo relacional de objetos)

- Un ORM simplifica la comunicación entre una base de datos y el código de tu aplicación

- En lugar de escribir consultas de SQL escribes funciones que son bastante similares a el codigo que ya escribes

### Ventajas de un ORM

- **Abstracción**: Esto significa que puedes interactuar con la base de datos usando objetos, clases y métodos en lugar de escribir consultas SQL complicadas

- **Portabilidad**: Puedes cambiar de un sistema de gestión de bases de datos a otro sin tener que reescribir todo tu código

- **Productividad**: El ORM se encarga de tareas repetitivas como la generación de consultas SQL, lo que te permite enfocarte en la lógica de tu aplicación

### Consideraciones a la hora de elegir un ORM

- Debe estar en desarrollo de forma activa

- Un ORM asegura la entrada de la información, pero siempre debes validar

- Cambiar de ORM's puede no ser tan simple, elige con cuidado antes de iniciar un proyecto

### ORM's soportados en Node.js

- Mongoose

- Prisma

- Sequelize

- TypeORM

## Sequelize ORM

- Sequelize soporta TypeScript y diferentes bases de datos: Oracle, PostgreSQL, MySQL, MariaDB, SQLite y SQL Server

- También soporta relaciones de información, lazy loading, eager loading y más

### Servicios en la nube para crear la base de datos

- [Filess](https://filess.io/): Soporta diferentes bases de datos: MySQL, MariaDB, PostgreSQL y mongoDB

- [Render](https://render.com/): Permite tener bases de datos, proyectos con un backend y proyectos estaticos. El plan gratis no es para un entorno de producción, se recomienda crear una cuenta con una cuenta de GitHub

### Creación de la base de datos en render

- Luego de crear una cuenta, ve a la opción `Dashboard`, luego haz clic en `New` y luego selecciona la opción `PostgreSQL`

- Establece las siguientes caracteristicas
  
  - Nombre: `rest-api-node-typescript`
  
  - Nombre de la base de datos y usuario (se deja en blanco)
  
  - Región: elige la más cerca a tu ubicación
  
  - PostgreSQL versión: elige la ultima versión de PostgreSQL o la que tienes instalada en tu PC
  
  - Plan Option: selecciona el plan gratuito, 256 MB RAM y 1 GB de almacenamiento

- Pulsa el boton create database y espera unos 5 minutos para que lo pueda crear (El Status debe mostrar `Available`, disponible)

- Luego de 90 dias se elimina automaticamente la base de datos, puedes exportar y luego volver a importar los datos en una nueva base de datos

### Instalar Sequelize en el proyector

- Para instalar Sequelize en el servidor, se tiene que instalar la dependencia para la base de datos, en este caso, para PostgreSQL ejecuta los comandos (desde la terminal de VSCode):

```powershell
npm install --save sequelize
npm install --save pg pg-hstore
```

- Obtenido de la documentación de [Sequelize](https://sequelize.org/docs/v6/getting-started/)

- Puedes verificar que haya un cambio en el archivo `package.json`, se tiene instalado las dependencias `pg`, `pg-hstore` y `sequelize`.

- Crea una carpeta llamada `config` en la carpeta `src`, sirve para las configuraciones, dentro de la carpeta `config`, crea el archivo `db.ts` .

### Conectar el servidor de express a la base de datos con Sequelize

- Tras haber creado la base de datos, en Render, se tiene una sección denominada Connections, ahi podras ver una conexión desde una URL externa (External Database URL), ten en cuenta esa URL porque contiene las credenciales de conexión a la base de datos: Hostname, Port, Database, Username, Password, etc.

- Puedes utilizar el siguiente codigo en el archivo `db.ts`, pega la URL conexión externa en el codigo.

```ts
// Importa una instancia de Sequelize
import { Sequelize } from "sequelize";

const db = new Sequelize("<<URL de conexión externa>>");
```

- Luego en el archivo server.ts, puedes utilizar el siguiente codigo para probar la conexión a la base de datos

```ts
// Importa el modulo db
import db from "./config/db
"
// Define una función para conectar a la base datos,
// sequelize utiliza promise, recuerda utilizar la sintaxis de async y await
async function connectDB() {
    try {
        // Espera a que se realice la conexión, el metodo authenticate sirve para autenticarse a la base de datos
        await db.authenticate()

        // sync aplica los cambios de forma automatica que se realizaron a la base de datos
        db.sync()

        console.log("Conexión exitosa a la BD")


    } catch (error) {
        console.log(error)

        console.log("Hubo un error al conectar a la base de datos")
    }
}

// Llama a la función connectDB
connectDB()
```

- Nota: Puede tardar en conectarse a la base de datos por el plan grauito de Render.

### Error SSL/TLS required

- Es uno de los errores comunes que suelen aparecer al ejecutar `npm run dev`, se requiere una conexión SSL o TSL. 

- Tienes 2 opciones para solucionarlo

```ts
// Importa una instancia de Sequelize
import { Sequelize } from "sequelize";

// 1° agrega "?ssl=true" en la URL de conexión
// const db = new Sequelize("<<URL de conexión externa>>?ssl=true");

// 2° agrega un objeto para las opciones de la conexión
const db = new Sequelize("<<URL de conexión externa>>",{
    dialectOptions: {
        ssl: {
            require: false
        }
    }
});
```

## Variables de entorno en Node.js

- Se requiere de una dependencia llamada [dotenv](https://www.npmjs.com/package/dotenv), instalala con el comando `npm i dotenv`

- Luego puedes crear el archivo `.env` (tal y como esta escrito) fuera de la carpeta `src`.

```env
# Define una variable de entorno sin comillas
DATABASE_URL = <<URL de conexión externa>>
```

- Para utilizar las variables de entorno definidas utiliza la siguiente sintaxis:

```ts
// Llama a las variables de entorno definidas en el archivo ".env"
dotenv.config()

// Imprime todas las variables de entorno, además de las que tiene instaladas Node
console.log(process.env)

// Imprime la variable de entorno DATABASE_URL
console.log(process.env.DATABASE_URL)

// Reemplaza la URL de conexión externa
const db = new Sequelize(process.env.DATABASE_URL!);
```

- Tambien no olvides crear un archivo llamado `.gitignore` para colocar los archivos que seran ignorados al subir el proyecto a GitHub.

```gitignore
# Carpeta de librerias instaladas
node_modules/

# Carpeta de deploy del proyecto
dist/

# Archivo contenedor de las variables de entorno
.env
```

## Dbeaver

// Para conectarse a un cliente como Dbeaver para ver los datos de la base de datos.

// Puedes instalar Dbeaver desde el siguiente enlace: https://dbeaver.io/download/ (versión community)

// Abre Dbeaver, debajo del menu archivo haz clic en el icono de "nueva conexión", selecciona la base de datos PostgreSQL

// Selecciona el tipo de conexión "Host" y luego toma los valores de la variable de entorno

// DATABASE_URL = postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw?ssl=true

// El host se encuentra despues del caracter @: dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com
// El puerto es: 5432
// La base de datos esta despues del caracter /: rest_api_node_typescript_ugcw

// El modo de autenticación se deja en: Database Native
// Nombre de usuario se encuentra despues del caracter //: rest_api_node_typescript_ugcw_user
// La contraseña, despues del caracter dos puntos: eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03

// Luego haz clic en el botón Probar conexión y debe aparecer un cuadro de dialogo que diga "Conectado". Pulsa el botón Finalizar y en el panel izquierdo se crea la conexión

// Puedes ir al panel izquierdo y expandir la carpeta "Bases de Datos", el nombre de la base de datos, carpeta "Esquemas", "public" y "Tablas" (ahi se crearan las tablas para la base de datos)

// pgAdmin es una herramienta de PostgreSQL para conectarse a la base de datos

## Colores en los mensajes de consola

- Instala la libreria de [colors.js](https://www.npmjs.com/package/colors) con el comando `npm i colors`

- Utilizala en el codigo

```ts
// Importa el modulo colors (libreria colors.js)
import colors from 'colors'

// Color de fondo del mensaje verde
console.log(colors.bgGreen("Texto de color verde"))

// Color de texto rojo
console.log(colors.red("Texto de error"))

// Color de texto cyan y en negrita
console.log(colors.cyan.bold("REST API en el puerto 4000"))
```

## Definir el modelo de una tabla en el servidor

- Para generar las tablas y columnas de forma automatica, desde el servidor, puedes crear un modulo siguiendo la sintaxis `nombre.model.ts` para el nombre del archivo y luego utilizar los decoradores:
  
  - @Table: Nombre de la tabla
  
  - @Column: Nombre de columna, incluye su tipo de dato.
  
  - @Default: Valor por defecto que se asignara a la columna

- PostgreSQL no soporta el tipo de dato FLOAT con decimales, por ello importante tener en cuenta los [tipos de datos](https://sequelize.org/docs/v7/models/data-types/) que soporta los distintos motores de bases de datos

- Ejemplo para la definición de una tabla products con 3 columnas (no se genera el campo ID porque se genera automaticamente)

```ts
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product
```

- Luego añade las siguientes configuraciones en el archivo `tsconfig.json`

```json
{
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "lib": ["esnext"],
        // Añade estas 3 configuraciones para que el código TypeScript sea compatible con Node.js y aplicar las configuraciones de los decoradores
        "target": "ESNext",
        "moduleResolution": "NodeNext",
        "module": "NodeNext",
        "strict": false,
        "sourceMap": true,
        "esModuleInterop": true,
        "declaration": true,
        // Configuraciones para los decoradores de TypeScript en el modelo de datos
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    },
    "include": ["src/**/*.ts"],
}
```

- Ejecuta el servidor y al observar la base de datos en DBeaver, en el panel izquierdo luego de haberse conectado a la base de datos, ve a la carpeta `tablas`, haz clic derecho, selecciona `Refresh` y observa que se ha generado una tabla `products` con las columnas definidas en ese modelo.

## Validaciones en las peticiones

- Se requiere instalar la dependencia de express validator con el comando `npm i express-validator`.

- Las validaciones se aplican en el contrador o en las definiciones de las funciones que realizan la petición.

**Nota**: El codigo fuente es muy largo, por lo cual necesitas acceder al codigo fuente de la aplicación para visualizar las definiciones de los endpoints y las validaciones en los archivos: `router.ts`, `index.ts` y `product.ts`.
