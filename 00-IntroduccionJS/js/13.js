// Function Declaration

// Definición de una Function Declaration con 2 argumentos (con valores por defecto)
function sumar(numero1 = 0, numero2 = 0) {
  // Cuerpo de la función
  console.log(numero1 + numero2);
}

// Se puede llamar a la función en cualquier parte del código, incluso antes de su declaración (por hoisting).

// Llama o invoca a la función sumar con 2 argumentos
sumar(10, 20); // Imprime 30
sumar(100, 131); // Imprime 231
sumar(10); // Imprime 10 (ya que falta el segundo argumento)
