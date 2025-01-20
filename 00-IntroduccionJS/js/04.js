// Objetos

// Definición de un objeto
const producto = {
  // Una propiedad es un par de nombre y valor
  nombre: "Tablet",
  precio: 300,
  disponible: false,
};

console.log(producto); // Muestra el objeto completo
console.table(producto); // Muestra el objeto en formato tabla
console.log(producto.nombre); // Acceso a una propiedad específica

// Destructuring (extrae las propiedades del objeto como variables)
const { nombre, precio, disponible } = producto;
console.log(nombre);
console.log(precio);
console.log(disponible);

// Sin aplicar desestructuración
// const nombre = producto.nombre
// const precio = producto.precio
// const disponible = producto.disponible
// console.log(nombre)
// console.log(precio)
// console.log(disponible)

// Object Literal Enhacement
const autenticado = true;
const usuario = "Juan";
const nuevoObjeto = {
  // Si la propiedad y la variable tiene el mismo nombre, se simplifica
  // autenticado: autenticado
  autenticado,
  usuario,
};

console.log(nuevoObjeto); // { autenticado: true, usuario: "Juan" }
