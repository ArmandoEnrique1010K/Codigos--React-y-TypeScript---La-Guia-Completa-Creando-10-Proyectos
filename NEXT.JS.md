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


