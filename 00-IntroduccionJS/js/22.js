// Optional chaining (?)

const alumno = {
  nombre: "Juan",
  clase: "Programación 1",
  aprobado: true,
  examenes: {
    examen1: 90,
  },
};

// Es un operador que permite acceder a propiedades de objetos anidados o llamar a métodos sin tener que verificar previamente si las propiedades o métodos existen
console.log(alumno.examenes?.examen1); // 90, porque examen1 sí existe
console.log("Después de ALUMNO");

// Nullish coalescing operator (??)

// Es un operador lógico que permite proporcionar un valor predeterminado cuando el valor de la variable es null o undefined, pero no si la variable tiene un valor falso como 0, false, o una cadena vacía "".
const pagina = 10 ?? 1;
console.log(pagina); // 10
