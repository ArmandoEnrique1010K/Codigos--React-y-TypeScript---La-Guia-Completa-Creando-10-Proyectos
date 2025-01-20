// Modificar los elementos de un arreglo

const tecnologias = ["HTML", "CSS", "JavaScript", "React.js", "Node.js"];

// Elimina un elemento del arreglo con el metodo filter para excluir el elemento
// const tecnologias2 = tecnologias.filter(function(tech) {
//     if(tech !== 'HTML') {
//         return tech  // Elimina 'HTML' sin modificar el arreglo original
//     }
// })

// Modifica un elemento del arreglo con el metodo map
const tecnologias2 = tecnologias.map(function (tech) {
  if (tech === "Node.js") {
    return "Nest.js"; // Cambia "Node.js" por "Nest.js"
  } else {
    return tech; // Retorna el mismo valor si no es "Node.js"
  }
});

console.log(tecnologias2);
