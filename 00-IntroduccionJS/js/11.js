// Destructuring arrays

const tecnologias = ["HTML", "CSS", "JavaScript", "React.js", "Node.js"];

const react = tecnologias[3];

// Omite el primer, segundo y tercer elemento
const [, , , reactjs] = tecnologias;

console.log(reactjs); // "React.js"
