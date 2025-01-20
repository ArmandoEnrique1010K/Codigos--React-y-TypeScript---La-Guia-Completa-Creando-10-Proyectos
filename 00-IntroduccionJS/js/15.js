// Funciones - Arrow Functions
// Definición de una Arrow Function
const sumar = (numero1 = 0, numero2 = 0) => console.log(numero1 + numero2);

// Si la función tiene una única línea de código, se pueden omitir las llaves {} y la palabra return (cuando devuelve un valor).

sumar(10, 20);
sumar(300, 1);
sumar(100);

// Al igual que con un Function Expression, si intentas llamar a una Arrow Function antes de su declaración, se producirá un error
