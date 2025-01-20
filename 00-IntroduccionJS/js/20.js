// Operadores lógicos OR y AND
const saldo = 1000;
const pagar = 1200;
const tarjeta = false;

// ||: Solo una condición necesita ser verdadera.
// &&: Todas las condiciones deben ser verdaderas.

// Ejecuta "Puedes Pagar" si el saldo es suficiente O si hay tarjeta disponible
if (saldo > pagar || tarjeta) {
  console.log("Puedes Pagar");
} else {
  console.log("No no puedes pagar");
}

// En este caso, como ninguna de las condiciones es verdadera (saldo < pagar y tarjeta es false), la salida será "No puedes pagar"
