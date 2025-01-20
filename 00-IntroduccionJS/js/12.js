// Iterar sobre un arreglo

const tecnologias = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Nest.js",
  "TypeScript",
];

// Bucle for
// for (let i = 0; i < tecnologias.length; i++) {
//   console.log(tecnologias[i]); // Accede al elemento por índice
// }

// forEach
// tecnologias.forEach(function (tech) {
//   console.log(tech); // Imprime cada elemento
// });

// map (crea y devuelve un nuevo arreglo)
const arrayMap = tecnologias.map(function (tech) {
  return tech; // Crea un nuevo arreglo
});

// for ... of (menos usado)
for (let tech of tecnologias) {
  console.log(tech); // Imprime cada elemento
}

console.log(arrayMap);
