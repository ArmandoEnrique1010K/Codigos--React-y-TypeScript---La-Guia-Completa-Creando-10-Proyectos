# Deployment del frontend en Vercel

No olvidar colocar el archivo `vercel.json` dentro de la carpeta del proyecto, fuera de src,

```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

Ejecuta npm run build en la terminal para asegurar de que no ocurra ningun error que falte solucionar en el proyecto.

MongoDB Atlas ya tiene la base de datos desplegada.

Sube todo el codigo del proyecto a un nuevo repositorio de github

![](C:\Users\USER\Desktop\ArmandoEnrique1010K\APUNTES-PROGRAMACION-CERTUS-UDEMY-ETC\2025-06-15-12-20-46-image.png)

No agregues un archivo README.

Ve al proyecto frontend desde VSCode y agrega los siguientes comandos

```shell
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ArmandoEnrique1010K/upTask_Frontend.git
git push -u origin main
```

git add . agrega todos los archivos que no estan en el gitignore

git branch -M main, crea el branch o la rama principal

Ahora en github ya se encuentra el codigo.

Ve a vercel, a la pagina de inicio, clic en Add New, selecciona proyects

![](assets/2025-06-15-12-26-50-image.png)

Importa el repositorio donde esta el proyecto

![](assets/2025-06-15-12-27-32-image.png)

Selecciona el framework vite

![](assets/2025-06-15-12-28-27-image.png)

Por el momento, no colocar variables de entorno

![](assets/2025-06-15-12-28-43-image.png)

Porque se tiene que desplegar el backend para agregar las variables de entorno

Hara el deployment del proyecto

![](assets/2025-06-15-12-29-37-image.png)

Seguidamente ve al dashboard

![](assets/2025-06-15-12-36-06-image.png)

Haz clic en el enlace del dominio

![](assets/2025-06-15-12-36-30-image.png)

https://up-task-frontend-lake.vercel.app/



En ese caso, haz clic en el enlace y se mostrara la pagina de inicio de sesion del proyecot (segun lo definid oen routes como pagina de inicio)

![](assets/2025-06-15-12-43-20-image.png)
