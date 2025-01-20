// Fetch API con Promises

const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url)
  .then((response) => {
    // Si la respuesta es correcta (status 200), se convierte el cuerpo en JSON
    if (response.ok) {
      // Devuelve la promesa de los datos
      return response.json();
    }

    // Si la respuesta no es correcta, lanza un error
    throw new Error("Hubo un error...");
  })
  .then((data) => console.log(data)) // Muestra los datos JSON en la consola
  .catch((error) => console.log(error.message)); // Captura y muestra cualquier error

// CONTINUA AQUI
