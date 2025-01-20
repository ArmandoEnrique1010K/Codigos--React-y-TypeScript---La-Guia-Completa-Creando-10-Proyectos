// Metodos de arreglos

const tecnologias = ["HTML", "CSS", "JavaScript", "React.js", "Node.js"];
const numeros = [10, 20, 30];

// Filter
// Permite crear un nuevo arreglo con los elementos que cumplen con una condición específica.
const nuevoArray = tecnologias.filter((tech) => tech !== "HTML");
// const resultado = numeros.filter((numero) => numero > 15);

// Includes
// Revisa si un elemento existe en el arreglo y retorna true o false.
// const resultado = tecnologias.includes('CSS')

// Some
// Verifica si al menos un elemento cumple con una condición, y retorna true o false.
//  const resultado = numeros.some( numero => numero > 15 )

// Find
// Devuelve el primer elemento que cumple una condición
// const resultado = numeros.find( numero => numero > 20 )

// Every
// Verifica si todos los elementos cumplen con una condición, y retorna true o false.
// const resultado = numeros.every( numero => numero > 5 )

// Reduce
// Permite aplicar una función de acumulación sobre los elementos de un arreglo, y devolver un único valor (como la suma, multiplicación, concatenación, etc.).
const resultado = numeros.reduce((total, numero) => total + numero, 0);

console.log(resultado);
