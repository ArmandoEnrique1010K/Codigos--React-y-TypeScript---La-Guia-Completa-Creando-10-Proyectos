# NEXT.JS

El framework de React para web

Next.js es un framework de React para la construcción de sitios y aplicaciones Full Stack, puedes utilizar componente de React para crear tu sitio y Next.js para caracteristicas muy especificas y optimizaciones.

Next.js se encarga de compilar tu aplicación, por lo tanto solo te preocupas por crear tu app y no por la configuración

Su principal caracteristica es que ejecuta React en el servidor.

## Principales caracteristicas

RENDERING: Puede ejecutar codigo de cliente y servidor, este componente se ejecuta en el cliente o el servidor

OPTIMIZACIONES: Incluye cache, optimizaciones para imagenes, rutas, etc; gran cantidad de optimizaciones

Soporta typescript, además de javascript

Routing: incluye routing sin instalar alguna libreria

Data fetching: diferentes formas de obtener datos desde una API, data fetching

## Next Routers: App y Pages Router

Desde la versión 13, Next.js tiene 2 routers: App y Pages Router

Para proyectos nuevos, el recomendado es App Router, el equipo de Vercel ha mencionado que no planean eliminar pages Router, pero todas las nuevas  caracteristicas de Next.js son agregadas al App Router.

El codigo entre App y Pages Router es muy diferente en especial para nombrar archivos y obtener datos.

## CREANDO EL PROYECTO DE NEXTJS

Ejecuta

```shell
npx create-next-app@latest
```

Si te pide instalar un paquete como create-next-app@15.3.3 solamente escribe "Y" y pulsa Enter

Escribe el nombre del proyecto

Selecciona Yes para poder habilitar typescript en el proyecto

EsLint tambien, TailwindCSS, tambien,

Would you like your code inside a `src/` directory?

Esa pregunta especifica que src directo es parte de app router, genera las rutas en src/app, aunque no pueda ser una buena opcion porque tu creas la estructura de carpetas, selecciona No

Would you like to use App Router? (recommended) » No / Yes

Pregunta si quieres usar AppRouter, pulsa Yes

? Would you like to use Turbopack for `next dev`? » No / Yes, selcciona NO

Por ultimo pregunta tambien si quieres personalizar los alias @/*

, coloca NO

Comenzara a instalar dependencias.

![](assets/2025-06-15-17-11-15-image.png)

Una diferencia es que nextjs ya no hace falta instalar dependencias porque ya lo hace

Escribe `npm run dev` y comenzara a ejecutar el proyecto, pulsa CTRL + C para detener el servidor

![](assets/2025-06-15-17-12-51-image.png)

Ve a http://localhost:3000/ desde un navegador

![](assets/2025-06-15-17-13-29-image.png)

Abre el proyecto en VScode, la estructura es diferente

![](assets/2025-06-15-17-23-14-image.png)

la carpeta app es el app router,

next.config.ts, configuraciones de next

tailwind.config.ts no existe porque tailwind esta en la version 4

Hay reglas en nextjs

global.css contiene la hoja de estilos que se aplicara que manera global

layout.tsx --> metadata y layout???

```tsx
// Titulo y descripción
export const metadata: Metadata = {
  title: "Quioso Next.js con App Router y Prisma",
  description: "Quioso Next.js con App Router y Prisma",
};
```

page.tsx,

define las rutas

Imprime hola mundo

```tsx
// Mensaje de hola mundo en la vista del usuario
export default function Home() {
  return <h1>Hola Mundo Next.js</h1>;
}
```

Guarda los cambios y se detecta los cambios y actualiza automaticamente el navegador.

## Archivos reservados

Son para organizar los proyectos

Con el App Router Next.js agrego una gran cantidad de archivos reservados que cumplen ciertas funcionalidades y dan orden a tus aplicaciones.

Tambien las carpetas forman parte importante de tus ya que cada carpeta sera una ruta

## Carpetas en NEXT.JS

Si se quiere estructura la URL de la forma /products/new, debes crear una carpeta products y dentro de ella una carpeta new (concepto de segmentos en Next.js)

---

NextJs escanea los archivos existentes, detecta una nueva carpeta en app  y si vas a 

![](assets/2025-06-15-18-04-04-image.png)

```tsx
export default function ProductsPage() {
  return <div>ProductsPage</div>;
}
```

![](assets/2025-06-15-18-04-45-image.png)

Si vas a localhost:3000/products, automaticamente se muestra el componente page.tsx (se encuentra dentro de la carpeta products)

Ese fue el sistema de URLs y rutas

## Convensiones de archivos .js, .jsx o tsx

layout --> diseño global que comparte una URL o sus segmentos hijos, ayuda a no repetir tanto codigo

page --> diseño unico para una URL

loading --> componente que se muestra mientras carga una pagina con suspense

not-fount --> componente que se muestra mientras un recurso no es encontrado - 404

error --> componente que se muestra cuando hay errores inesperados.

route --> componente para endpoint de REST API

---

## Rendering en Next.js

Componentes del cliente y el servidor

### Server Components

Una de las principales caracteristicas que tiene Next.js desde que fue lanzado es poder ejecutar codigo de React en el servidor

En versiones anteriores el mismo codigo se ejecutaba primero en el servidor y despues en el cliente

Desde Next 13, con el app directory, todos los componentes se ejecutan por default en el servidor

En caso de que sea necesarios se puede añadir que un componente sea ejecutado en el cliente con la directiva "use client"

Cuando tienes aplicaciones con componentes de servidor y cliente es muy importante mencionar que el codigo es unidireccional

---

Pirmero se ejecuta los componentes de servidor y luego los del cliente

### Consideraciones server y client Components

Un componente de servidor puede renderizar componentes de cliente sin problemas.

Si tienes un componente de servidor y dentro se renderiza uno de cliente y dentro del cliente se renderiza un servidor, no va a funcionar

Si tienes uno de servidor, dentro se tiene uno de cliente y dentro del componente de cliente se renderiza otro componente de tipo cliente, en automatico pasa a ser componente de cliente (aunque no tenga la directiva).

### ¿Cuando utilizar Server Components?

Obtener datos desde un ORM y mostrar la información.

Ejecutar funciones del servidor y acceder a recursos unicamentes en el backend

Autenticacion, API Keys o Tokens

### ¿Cuando utilizar client Components?

Cuando deseees utilizar eventos o añadir interaccion a tus aplicaicones por medio de onClick, onSubmit, onChange, etc.

Si deseas utilizar los hooks de React como useState, useEffect y useReducer, etc.

Utilizar librerias que no se ejecutan en el servidor como toast, zustand u otras que solo funcionan en el cliente.

Utilizar API's del navegador como LocalStorage, Notification API, GeoLocation API, etc.

Consumir datos de una API externa en JSON.

## Prisma ORM

Prisma es un ORM open Source que se puede utilizar con JavaScript o TypeScript.

Consta de 3 herramientas: Prisma-Client, Prisma Migrate y Prisma Studio.

### Herramientas de Prisma

Prisma Cliente es el Query Builder o la herramienta que te permite consultar tu base de datos, soporta Node.js y TypeScript y se puede utilizar con Next.js sin ningun problema.

Prisma Migrate, en Prisma puedes definir tus tablas y relaciones y esta herramienta se encarga de generar toda la base de datos por ti.

Prisma Studio, es la unica herramienta de Prisma que no es Open Source pero se puede utilizar localmente, es para ver tu base de datos.

### Bases de datos soportadas por Prisma

MariaDB

SQL Server 2017, 2019 y 2022

MongoDB

MySQL

PostgreSQL 

SQLite

## Instalando prisma

Introduce el comando `npm i @prisma/client` para utilizar Prisma y tener acceso a las funciones, además de la dependencia de desarrollo `npm i -D prisma`.

Luego ejecuta `npx prisma init`, genera la carpeta de prisma y dentro se tiene un schema.prisma, ahi se coloca las tablas y las columnas de como se van a relacionar, por defecto utiliza postgresql

![](assets/2025-06-21-18-26-20-image.png)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Tambien genera el archivo .env, en donde se coloca la direccion de una base de datos (no funcional)

```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=eyJkYXRhYmFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zdGdyZXNAbG9jYWxob3N0OjUxMjE0L3RlbXBsYXRlMT9zc2xtb2RlPWRpc2FibGUmY29ubmVjdGlvbl9saW1pdD0xJmNvbm5lY3RfdGltZW91dD0wJm1heF9pZGxlX2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbWVvdXQ9MCZzaW5nbGVfdXNlX2Nvbm5lY3Rpb25zPXRydWUmc29ja2V0X3RpbWVvdXQ9MCIsIm5hbWUiOiJkZWZhdWx0Iiwic2hhZG93RGF0YWJhc2VVcmwiOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQGxvY2FsaG9zdDo1MTIxNS90ZW1wbGF0ZTE_c3NsbW9kZT1kaXNhYmxlJmNvbm5lY3Rpb25fbGltaXQ9MSZjb25uZWN0X3RpbWVvdXQ9MCZtYXhfaWRsZV9jb25uZWN0aW9uX2xpZmV0aW1lPTAmcG9vbF90aW1lb3V0PTAmc2luZ2xlX3VzZV9jb25uZWN0aW9ucz10cnVlJnNvY2tldF90aW1lb3V0PTAifQ"
```

Puedes utilizar render para crear una base de datos

![](assets/2025-06-21-18-27-58-image.png)

![](assets/2025-06-21-18-28-29-image.png)

![](assets/2025-06-21-18-28-38-image.png)

![](assets/2025-06-21-18-28-50-image.png)

![](assets/2025-06-21-18-28-55-image.png)

![](assets/2025-06-21-18-29-53-image.png)

Selecciona la opcion de extenral DatabaseURL y  reemplaza la linea del codigo en env.-

```.env
DATABASE_URL="postgresql://root:jAssa4ywOu4SgV8wCDczDWAXfGKVP9KA@dpg-d1bk0cur433s739lq710-a.oregon-postgres.render.com/quiosconext_s6b9"
```

npx prisma studio

![](assets/2025-06-21-18-40-12-image.png)

Puedes acceder a los registros, agregar registros, similar a DBeaver, para hacerlo en DBeaver solamente se requiere La URL externa de la base de datos

---

Si hay relaciones en 2 tablas, se mostraran tambien

![](assets/2025-06-21-18-56-14-image.png)

![](assets/2025-06-21-18-56-37-image.png)

Se recomienda instalar prisma como extension de vscode

https://marketplace.visualstudio.com/items?itemName=Prisma.prisma

---

## Seeding

Es una forma en el cual puedes agregar datos, de prueba o de forma masiva en la aplicación, los datos se recomiendan que sean lo más cercano a producción.

https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

Primero instala la dependencia de ts-node, recordar que permite ejecutar codigo de TypeScript en el CLI (terminal), utiliza el comando `npm i -D ts-node`

Luego crea un archivo dentro de la carpeta prisma, llamado `seed.ts`

Dentro de la carpeta prisma, crea la carpeta data, dentro de ella crea los archivos categories.ts y products.ts

## Errores al ejecutar `npx prisma db seed`

```powershell
PS C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next> npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts` ...
C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\node_modules\.prisma\client\default.js:43
    throw new Error('@prisma/client did not initialize yet. Please run "prisma generate" 
and try to import it again.');
          ^
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
    at new PrismaClient (C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\node_modules\.prisma\client\default.js:43:11)
    at Object.<anonymous> (C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\prisma\seed.ts:9:16)     
    at Module._compile (node:internal/modules/cjs/loader:1358:14)
    at Module.m._compile (C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\node_modules\ts-node\src\index.ts:1618:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
    at Object.require.extensions.<computed> [as .ts] (C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1208:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1024:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at phase4 (C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next\node_modules\ts-node\src\bin.ts:649:14)

An error occurred while running the seed command:
Error: Command failed with exit code 1: ts-node --compiler-options {"module":"CommonJS"} 
prisma/seed.ts
```

1. Elimina la carpeta node_modules y el archivo package-lock.json, luego ejecuta npm install

2. INtroduce el comando npx prisma migrate dev

3. Verifica que los nombres de la tablas sean category y product

seed.ts

```ts
// Importa los datos
import { categories } from "./data/categories";
import { products } from './data/products';

// PrismaClient tiene las funciones para trabajar con la base de datos
import { PrismaClient } from '@prisma/client'

// Instancia para obtener los metodos
const prisma = new PrismaClient();

async function main() {
  try {
    // Ingresa las categorias y productos a los modelos

    // Inserta varios registros a las tablas
    await prisma.category.createMany({
      data: categories
    })

    await prisma.product.createMany({
      data: products
    })

  } catch (error) {
    console.log(error)
  }
}

// Ejecuta la función, en ambos casos se deben insertar los datos y luego desconectarse
main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
  process.exit(1)
})

// Luego realiza una modificacion en el archivo package.json, agrega la propiedad prisma

/*
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
*/

// Segun la documentación de Prisma, el codigo mostrado se requiere en proyectos hechos con Next.js

// Luego abre la terminal y ejecuta npx prisma db seed
```

Debe mostrar lo siguiente

PS C:\Users\USER\Desktop\ArmandoEnrique1010K\Codigos--React-y-TypeScript---La-Guia-Completa-Creando-10-Proyectos\16-quiosco-next> npx prisma db seed    
Environment variables loaded from .env
Running seed command `ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts` ...

The seed command has been executed.

![](assets/2025-06-21-19-51-24-image.png)

Vuelve a ejecutar prisma studio con npx prisma studio

Verifica que haya datos insertados

![](assets/2025-06-21-19-52-44-image.png)

Pulsa F5 para recargar la pagina

## Data fetching, obtener datos en next.js

Data Fetching en Next.js se puede hacerse con 4 formas diferentes:

- En el servidor con fetch()

- En el servidor con un ORM o consultas SQL

- En el cliente con un Route Handler y una peticion GET

- En el cliente con React Query, Axios, SWR u otras opciones

## Archivos externos

Se colocan en la carpeta public, se colocan imagenes, logos, iconos, etc. Puedes elimianr las imagenes svg que se generan por defecto al crear un proyecto de nextjs

---

## Routing Dinamico en NEXT.JS

Muchas veces vas a querer acceder a un recurso en la base de datos por su ID o slug, ya sea para ver los detalles de un producto, leer una entrada de blog o datos de un cliente

En estos casos se utiliza el Routing Dinamico

En App Router la forma en la que generas el Routing dinamico es con una carpeta y un nombre entre corchetes, ejemplo: [id], [slug], [paymentId], etc.

### Ejemplo de Routing Dinamico

/products/20

Crea las carpetas product e [id] tal y como se muestra

products --- dentro de ella se encuentra --> [id]

## Obtener la categoria

Vuelve a ejecutar (quizas en otra terminal) el comando npx prisma studio

Al obtener todos los productos, en el campo Category, haz clic en el boton category para traer los datos relacionados a la categoria

![](assets/2025-06-21-22-14-55-image.png)

## Componente Image de Next.js

Muestra una imagen optimizada (requiere 4 props necesarias)

```ts
      <Image
        width={400}
        height={500}
        src={`/products/${product.image}.jpg`}
        alt={`Imagen plantilla ${product.name}`}
      />
```

Pulsa F12, seccion Red, filtra solamente las imagenes pulsando Img, vuelva a cargar la pagina y observa que solamente carga las imagenes requeridas

![](assets/2025-06-21-22-35-59-image.png)

Desplazate en la imagen bajando la regleta de carga o la barra de desplazamiento y podras ver que se cargan más imagenes cuando más abajo vayas.

El resultado es el performance del proyecto

Nextjs genera la imagen jpg en formato webp, formato moderno para tener imagenes de buena calidad y ligero

      <Image

        width={400}

        height={500}

        src={`/products/${product.image}.jpg`}

        alt={`Imagen plantilla ${product.name}`}

        // La prop quality establece la calidad (100 muestra imagenes pesadas, 1 muestra imagenes pixeleadas), valor recomendado: 75

        quality={75}

      />

## Server Actions en Next.js

Los server Actions son funciones asincronas que se ejecutan en el servidor, se pueden utilizar con clientes de Componente y Servidor.

Se utilizan para crear datos o mutarlos y estan muy unidos al CRUD.

Utilizan la directiva "use server" que en el caso de componentes de servidor debe ser la primera linea de la función, mientras que en client componentes se deben importar de otro archivo que en la parte superior deben tener esta directiva.

Los server actions deben estar dentro del atributo `action` de un `<form>`

Tambien pueden ser llamados dentro de un `useEffect` o al precionar un boton.

No son exclusivos de Next.js ya que React en la version 19 los va a tener incorporados.

## Relación entre tablas

Video 691

![](assets/2025-06-22-18-02-25-image.png)

## Revalidación de datos

Existen 2 tipos de revalidaciones en NextJs, una basada en el tiempo y otra basada en ciertos eventos

Actualizacion de datos en tiempo real

[Data Fetching: Fetching, Caching, and Revalidating | Next.js](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-client-with-route-handlers)

Ejemplo: Pulsa un boton, hace un refetch y trae los datos actualizados sin la necesidad ed pulsar F5 en el navegador.

Basado en el tiempo: requiere los milisegundos

En ciertos eventos: Al hacer clic en un boton, mediante un tag (nombre similar a un key), revalidate path (revalida la URL).

import { revalidatePath } from "next/cache" <-- revalida la URL completa

import { revalidateTag } from "next/cache"

## Subida de imagenes con Cloudinary

Es un servicio para subir imagenes, puedes instalar la dependencia con npm para integrar alguna otra libreria de subida de imagenes,

Puedes registrarte con tu cuenta de google

![](assets/2025-06-25-21-01-16-image.png)

Una vez registrado, ve a la pestaña assets

![](assets/2025-06-25-21-02-36-image.png)El plan gratuito ofrece lo siguiente:

![](assets/2025-06-25-21-04-32-image.png)

![](assets/2025-06-25-21-04-43-image.png)

Dan 25 creditos mensuales

Se va a utilizar para hospedar imagenes

Ve a la pestaña de configuración, opcion API keys

![](assets/2025-06-25-21-11-48-image.png)

![](assets/2025-06-25-21-11-28-image.png)

Necesitas copiar el API Key, no es necesario el API Secret

Se necesita la dependencia de Next Cloudinary (solamente funciona en componentes de cliente)

usa el comando `npm i next-cloudinary`

[Next Cloudinary - NPM](https://www.npmjs.com/package/next-cloudinary)

Se requieren 3 variables de entorno en el archivo .env

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloudinary Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your Cloudinary API Key>"
CLOUDINARY_API_SECRET="<Your Cloudinary API Secret>"
```

El Cloud Name lo encuentras en la opción de Product Environments

![](assets/2025-06-25-21-25-43-image.png)

Las 2 ultimas variables de entornos son las misma que el ultimo API Key generado el API Key y API Secret

![](assets/2025-06-25-21-28-00-image.png)

El API Secret requiere que envies un codigo desde tu correo (token)

Puedes reiniciar la consola con npm run dev

### Vista para subir una imagen

![](assets/2025-06-25-21-52-06-image.png)

## Generar un upload preset

Ve a la pestaña de upload

![](assets/2025-06-25-22-05-59-image.png)

Haz clic en el boton Add Upload Preset, agregale un nombre y Cambia el valor de signing mode a unsigned

![](assets/2025-06-25-22-18-13-image.png)

utiliza este upload-preset ene lcodigo fuente

Para uqe permita subir contenido desde el navegador, agregale una propiedad llamada uploadPreset y coloca ahi el uploadpreset

Clic en el boton save

```tsx
"use client";
import { CldUploadWidget } from "next-cloudinary";
// Instala react-icons para los iconos con npm i react-icons
// Importa el componente de una fotografia
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  return (
    // Requiere una prop llamada uploadPreset, el valor lo encuentras en cloudinary, sección config, upload, upload Presets
    <CldUploadWidget
      uploadPreset="new_upload_preset"
      options={{
        maxFiles: 1, // Numero de archivos maximo
        // multiple: true, // Habilitar subida multiple
      }}
    >
      {/* El children es un callback, desestructra el metodo open para llamar a la función de abrir */}
      {({ open }) => (
        // Al hacer clic en el recuadro, se abrira una vista de cloudinary para subir una imagen
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400 bg-slate-100"
              onClick={() => open()}
            >
              {/* Tamaño del icono en pixeles */}
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>
            </div>
          </div>
        </>
      )}
    </CldUploadWidget>
  );
}

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload 400 (Bad Request)
// Cuando subes imágenes en Cloudinary desde el front end te piden que generes lo que se conoce como un upload preset
```

Al subir una imagen ya no deberia mostrarte un error en la consola

![](assets/2025-06-25-22-10-42-image.png)

---

## Subio la imagen

Automaticamente se cierra la ventana modal de cloudinary, para ver si la imagen ya se subio a cloudinary:

1. Ve a la pestaña assets, media library > assets

2. Podras ver las imagenes subidas ,aparte de las imagenes que vienen de muestra

![](assets/2025-06-25-22-24-02-image.png)

## Borrar imagenes de Cloudinary

Puedes pulsar CTRL + A para seleccionar todas las imagenes y luego pulsar el botón de la papelera

![](assets/2025-06-26-20-13-55-image.png)

![](assets/2025-06-26-20-14-02-image.png)
