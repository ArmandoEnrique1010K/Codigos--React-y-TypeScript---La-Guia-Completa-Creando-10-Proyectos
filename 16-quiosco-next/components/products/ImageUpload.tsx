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
      // Ejecuta una función si se subio la imagen correctamente
      onSuccess={(result, { widget }) => {
        // Imprime un objeto con varias propiedades, hay una propiedad llamada secure_url que contiene la url de la imagen subida, se puede recuperar del formData y guardarlo en la base de datos
        console.log(result);
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

// POST https://api.cloudinary.com/v1_1/dv4v0uvdy/upload net::ERR_FAILED 502 (Bad Gateway)
// Vuelve a crear otro upload preset con las configuraciones mencionadas: signing mode: unsigned
