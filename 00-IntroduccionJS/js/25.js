// Fetch API con Promises

// La Fetch API proporciona una forma fácil de hacer solicitudes HTTP desde JavaScript. Utiliza Promesas (Promise) para manejar el resultado de la solicitud, lo que facilita el trabajo con código asíncrono.

// Una Promesa es un objeto que representa la eventual finalización o el fallo de una operación asíncrona. Una Promesa puede estar en uno de los siguientes estados:

// Pendiente (pending): Cuando la operación aún no ha terminado.
// Cumplida (fulfilled): Cuando la operación se ha completado con éxito.
// Rechazada (rejected): Cuando la operación ha fallado.

// El método .then() se usa para manejar los estados de la Promesa y .catch() para capturar errores si la operación no es exitosa.

const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url)
  // response es un objeto que contiene información sobre la respuesta de la solicitud, como el código de estado, las cabeceras y el cuerpo de la respuesta.
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
