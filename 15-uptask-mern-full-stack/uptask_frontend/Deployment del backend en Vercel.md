# Deployment del backend en Vercel

Se necesita un script que construya el proyecto en producción y otro que sirva a la aplicación, en package.json, coloca lo siguiente en package.json, propiedad scripts

```json
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "dev:api": "nodemon --exec ts-node src/index.ts --api",
    "build": "tsc",
    "start": "node ./dist/index.js"
  },
```

tsc hace referencia al archivo tsconfig.json en el que se especifican los directorios de entrada y salida

el comando start srive para servir al proyecto

Recuerda que cuando introduces npm run build, se genera archivos de javascript dentro de la carpeta dist, el archivo de inicio es index.js

En el archivo .gitignore, coloca lo siguiente para evitar que los archivos se suban a producción

```gitignore
/node_modules
.env
package-lock.json
dist
```

SUBIR EL BACKEND

Crea un nuevo repositorio en github para subie el backend

![](assets/2025-06-15-13-05-16-image.png)

Introduce los mismos comandos en la terminal

```shell
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ArmandoEnrique1010K/UpTask_backend.git
git push -u origin main
```

![](assets/2025-06-15-13-06-57-image.png)

## DEPLOYMENT EN VERCEL, NO EN FL0 PORQUE YA NO EXISTE

  En vercel, haz clic en "Add New Project", importa el repositorio uptask_backend

![](assets/2025-06-15-13-10-03-image.png)

# DEPLOYMENT EN RENDER

![](assets/2025-06-15-13-15-20-image.png)

![](assets/2025-06-15-13-15-39-image.png)

![](assets/2025-06-15-13-20-19-image.png)

![](assets/2025-06-15-13-20-24-image.png)

![](assets/2025-06-15-13-20-33-image.png)

Tambien agregas las avariables de entorno definidas en .env

```
DATABASE_URL = mongodb+srv://root:qk9sTsiiDmNhdtWS@cluster0.ryazeqi.mongodb.net/uptask_mern

FRONTEND_URL = http://localhost:5173

SMTP_HOST = sandbox.smtp.mailtrap.io
SMTP_PORT = 2525
SMTP_USER = bf805b29ed7370
SMTP_PASSWORD = 88a7f201c47703

JWT_SECRET = palabrasupersecreta
```

Cambia FRONTEND_ULR por la URL del dominio en el que se ha desplegado el frontend (sin el slash al final de la URL)

![](assets/2025-06-15-13-24-13-image.png)

![](assets/2025-06-15-13-24-36-image.png)

Clic en deploy web service

![](assets/2025-06-15-13-25-09-image.png)

![](assets/2025-06-15-13-25-32-image.png)

El error que se muestra:

![](assets/2025-06-15-13-28-25-image.png)

Debes hacer una configuracion en MongoDB Attlas

Abre el cluster creado cluster0 (ahi se encuentran las bases de datos y colecciones), abre la sección "Network Access"

![](assets/2025-06-15-13-29-35-image.png)

Haz clic en "Add IP Address", pulsa "Allow Access from Anywhere"

![](assets/2025-06-15-13-30-59-image.png)

![](assets/2025-06-15-13-31-21-image.png)

Ve al dashboard en render, selecciona manual deploy y marca Deploy latest commit o RESTART SERVICE

![](assets/2025-06-15-13-33-56-image.png)

---

REALIZA UN CAMBIO EN EL FRONTEND DESPLEGADO

Abre la pestaña settings

![](assets/2025-06-15-13-45-53-image.png)

Clic en Environment Variables

![](assets/2025-06-15-13-46-14-image.png)

![](assets/2025-06-15-13-51-21-image.png)

![](assets/2025-06-15-13-51-31-image.png)

No olvidar que en la variable de entorno de VITE_API_URL, debe terminar con "/api"