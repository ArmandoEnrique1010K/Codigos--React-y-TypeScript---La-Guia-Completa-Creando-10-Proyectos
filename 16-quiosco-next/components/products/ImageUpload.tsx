"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
// Instala react-icons para los iconos con npm i react-icons
// Importa el componente de una fotografia
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  // estado de la URL de la imagen
  const [imageUrl, setImageUrl] = useState("");

  return (
    // Requiere una prop llamada uploadPreset, el valor lo encuentras en cloudinary, sección config, upload, upload Presets
    <CldUploadWidget
      uploadPreset="new_upload_preset"
      options={{
        maxFiles: 1, // Numero de archivos maximo
        // multiple: true, // Habilitar subida multiple
      }}
      // Ejecuta una función si se subio la imagen correctamente
      onSuccess={(result, { widget }) => {
        // Imprime un objeto con varias propiedades, hay una propiedad llamada secure_url que contiene la url de la imagen subida, se puede recuperar del formData y guardarlo en la base de datos
        // console.log(result);
        // console.log(result.info.secure_url);

        // Si se ha subido la imagen
        if (result.event === "success") {
          // Cierra la ventana modal de Cloudinary
          widget.close();

          //@ts-expect-error 'Omite o ignora que el valor de info es un objeto que contiene la propiedad secure_url'
          setImageUrl(result.info.secure_url);
        }
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

              {/* Muestra la imagen que se subio si imageUrl no es un "" */}
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl}
                    alt="Imagen de producto"
                  />
                </div>
              )}

              {/* Error: Invalid src prop (https://res.cloudinary.com/dv4v0uvdy/image/upload/v1750986151/v3ksqov4vwqrr23ldvlf.png) on `next/image`, hostname "res.cloudinary.com" is not configured under images in your `next.config.js`
              See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host */}

              {/* El error mencionado indica que el source no es valido, porque la imagen esta en un dominio diferente, debes agregar ese dominio en el archivo de configuracion de next (next.config.ts) */}
            </div>
          </div>

          {/* Input oculto, solamente contiene la URL de la imagen subida, se puede aplicar validaciones... */}
          <input type="hidden" name="image" value={imageUrl} />
        </>
      )}
    </CldUploadWidget>
  );
}

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload 400 (Bad Request)
// Cuando subes imágenes en Cloudinary desde el front end te piden que generes lo que se conoce como un upload preset

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload net::ERR_FAILED 502 (Bad Gateway)
// Vuelve a crear otro upload preset con las configuraciones mencionadas: signing mode: unsigned
