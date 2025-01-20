// Objetos - Destructuring de dos o más objetos
const producto = {
  nombre: "Tablet",
  precio: 300,
  disponible: false,
};

const cliente = {
  nombre: "Juan",
  premium: true,
};

const carrito = {
  cantidad: 1,
  // Expande las propiedades de `producto` directamente
  ...producto, // spread operator
};

const nuevoObjeto = {
  ...producto, // Propiedades de `producto`
  ...cliente, // Propiedades de `cliente`
};
console.log(nuevoObjeto);
// Resultado: { nombre: "Juan", precio: 300, disponible: false, premium: true }

// Object.assign(destino, fuente1, fuente2) une propiedades de múltiples objetos en uno.
const nuevoObjeto2 = Object.assign(producto, cliente);
console.log(nuevoObjeto2);
