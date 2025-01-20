// Importar y exportar modulos

// Se importan específicamente las funciones que necesitas utilizando el mismo nombre que la función exportada.

import { sumar, restar, multiplicar, division } from "./funciones.js";

// Puedes evitar colisiones de nombres usando as para renombrar las funciones importadas.

const resultado1 = sumar(20, 10);
const resultado2 = restar(20, 10);
const resultado3 = multiplicar(20, 10);
const resultado4 = division(20, 10);

console.log(resultado1); // 30
console.log(resultado2); // 10
console.log(resultado3); // 200
console.log(resultado4); // 2
