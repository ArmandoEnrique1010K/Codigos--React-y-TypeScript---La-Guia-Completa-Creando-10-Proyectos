// Objetos - Manipulación

const producto = {
  nombre: "Tablet",
  precio: 300,
  disponible: false,
};

// No permite modificar, añadir ni eliminar propiedades.
// Object.freeze(producto)

// Permite modificar propiedades existentes, pero no permite añadir ni eliminar propiedades.
// Object.seal(producto)

// Reescribe un valor
producto.disponible = true;

// Si no existe la propiedad, lo añade
producto.imagen = "imagen.jpg";

// Elimina una propiedad
delete producto.precio;

console.log(producto);
