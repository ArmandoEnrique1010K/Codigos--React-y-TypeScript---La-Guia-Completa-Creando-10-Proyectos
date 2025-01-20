// Funciones que retornan valores

// Cuando defines funciones que retornan valores, puedes utilizarlas para realizar cálculos o manipular datos, y luego usar ese resultado para realizar más operaciones.

// Si no utilizas return en una función, esta no devolverá un valor y se comportará como un procedimiento (sin valor de salida).

// Function declaration
// const sumar = function(numero1 = 0, numero2 = 0) {
//     return numero1 + numero2
// }

// Function expression
// function sumar(numero1 = 0, numero2 = 0) {
//     return numero1 + numero2
// }

// Arrow Function
const sumar = (numero1 = 0, numero2 = 0) => numero1 + numero2;

// Asigna el valor devuelto al ejecutar la función sumar a resultado
const resultado = sumar(10, 20);

console.log(resultado); // Imprime 30
