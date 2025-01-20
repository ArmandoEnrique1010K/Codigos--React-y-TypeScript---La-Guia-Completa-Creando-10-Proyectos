// Tipos de Dato

// Undefined
let cliente;
console.log(cliente); // undefined
console.log(typeof cliente); // "undefined"

// Strings o Cadenas de Texto
let alumno = "Juan";
console.log(alumno);
console.log(typeof alumno); // "string"

const producto = "Monitor 49 Pulgadas";
console.log(producto);
console.log(typeof producto);

// Numbers
const numero = 20.2;
const numero2 = 30;
const numero3 = -100;
const numero4 = "20";

console.log(typeof numero); // "number"
console.log(typeof numero2);
console.log(typeof numero3);

// BigInt
const numeroGrande = BigInt(19381903839113838981391383198138913);
console.log(typeof numeroGrande); // "bigint"

// Boolean
const activo = true;
console.log(typeof activo); // "boolean"

// Null
const descuento = null;
console.log(descuento); // null
console.log(typeof descuento); // "object" (quirk de JavaScript)

let precio = undefined;
console.log(precio);

// Symbol
const primerSymbol = Symbol(30);
const segundoSymbol = Symbol(30);
console.log(primerSymbol === segundoSymbol); // false
