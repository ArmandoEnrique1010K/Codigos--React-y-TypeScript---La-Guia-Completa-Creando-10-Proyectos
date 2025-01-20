// Evaluación de corto circuito

// Se refiere al comportamiento de ciertos operadores lógicos (como && y ||), donde la evaluación de una expresión se detiene tan pronto como el resultado es determinado.

// Truthy: Se refiere a cualquier valor que es considerado verdadero cuando se evalúa en un contexto booleano, aunque no sea estrictamente true. Ejemplos: {}, "texto", [], 5, function(){}

// Falsy: Son los valores que se evalúan como false en un contexto booleano, aunque no sean estrictamente false. Ejemplo: 0, "", null, undefined, NaN.
const auth = true;

// Cuando se usa el operador &&, la evaluación se detiene tan pronto como se encuentra un valor falsy,

// Imprime "Usuario Autenticado" porque auth es truthy
auth && console.log("Usuario Autenticado");
