// Objetos - Destructuring de dos o más objetos
const producto = {
  nombre: "Tablet",
  precio: 300,
  disponible: false,
};

const cliente = {
  nombre: "Juan",
  premium: true,
  direccion: {
    calle: "Calle México",
  },
};

// Extrae la propiedad "nombre" de producto
const { nombre } = producto;

const {
  // Renombra "nombre" de cliente a "nombreCliente" (alias)
  nombre: nombreCliente,
  // Extrae "calle" de "direccion"
  direccion: { calle },
} = cliente;

console.log(nombre); // "Tablet"
console.log(nombreCliente); // "Juan"
console.log(calle); // "Calle México"
