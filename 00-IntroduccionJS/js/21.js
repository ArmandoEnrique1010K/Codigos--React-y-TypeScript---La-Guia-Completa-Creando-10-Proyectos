// Operador ternario
const auth = true;

const saldo = 1000;
const pagar = 1200;
const tarjeta = true;

// Es una forma concisa de realizar una operación condicional
// auth ?
//     console.log('Usuario autenticado') :
//     console.log('No Autenticado, ir a Login')

// Si el saldo es mayor que el monto a pagar o si tiene tarjeta, el usuario puede pagar
saldo > pagar || tarjeta
  ? console.log("Si puedes pagar")
  : console.log("no, no puedes pagar");
