"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
// Instala react-icons para los iconos con npm i react-icons
// Importa el componente de una fotografia
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image: string | undefined }) {
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

          {/* Si el producto tiene una imagen se muestra lo siguiente */}
          {/* Una vez que se sube la imagen, no se debe mostrar la imagen actual (cuando se edita un producto) */}
          {image && !imageUrl && (
            <div className="space-y-2">
              <label>Imagen Actual: </label>
              <div className="relative w-64 h-64">
                <Image fill src={getImagePath(image)} alt="Imagen Producto" />
              </div>
            </div>
          )}

          {/* Input oculto, solamente contiene la URL de la imagen subida, se puede aplicar validaciones... */}
          {/* Recordar que lo que esta en el value es lo que se manda al servidor, si imageUrl existe lo debe utilizar, de lo contrario utiliza el de image (para que sobreescriba en la base de datos con la misma imagen cuando se edita un producto) */}
          <input
            type="hidden"
            name="image"
            // Puedes usar value o defaultValue (ese ultimo si se muestra un error en la consola al utilizar value)
            // A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
            defaultValue={imageUrl ? imageUrl : image}
          />

          {/* Pulsa F12 y revisa el formulario de editar producto y crear producto, si el input hidden tiene un value */}
        </>
      )}
    </CldUploadWidget>
  );
}

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload 400 (Bad Request)
// Cuando subes imágenes en Cloudinary desde el front end te piden que generes lo que se conoce como un upload preset

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload net::ERR_FAILED 502 (Bad Gateway)
// Vuelve a crear otro upload preset con las configuraciones mencionadas: signing mode: unsigned
