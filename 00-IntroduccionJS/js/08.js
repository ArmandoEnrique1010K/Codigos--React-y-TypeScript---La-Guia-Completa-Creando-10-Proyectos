// Template Strings y Concatenación

const producto = "Tablet de 12 Pulgadas";
const precio = 400;
const marca = "Orange";

// Concatenación con +
console.log("El Producto es: " + producto);
// Template String
console.log(`El Producto es: ${producto} `);

// "El Producto es: Tablet de 12 Pulgadas"

console.log(producto + " $" + precio + " Dolares, marca: " + marca);
console.log(`${producto} $${precio} Dolares, marca: ${marca}`);

// "Tablet de 12 Pulgadas $400 Dolares, marca: Orange"
