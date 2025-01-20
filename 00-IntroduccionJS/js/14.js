// Funciones - Function Expression

// No existe hoisting en este caso, por lo que la función se define y se ejecuta solo cuando se llega a esa línea.
sumar(10, 20);
sumar(300, 1);
sumar(100);

// Definición de una function Expression
function sumar(numero1 = 0, numero2 = 0) {
  console.log(numero1 + numero2);
}

// Observa la diferencia con function Declaration
// const sumar = function(numero1 = 0, numero2 = 0) {
//     console.log(numero1 + numero2)
// }
