// Fetch API con Async / Await

// La sintaxis async/await es una forma más moderna y sencilla de manejar operaciones asíncronas en JavaScript. A diferencia de las promesas tradicionales que usan .then() y .catch(), async/await permite escribir código asíncrono de una manera más parecida al código síncrono, lo que mejora la legibilidad.

// async: Se coloca antes de la declaración de una función, lo que indica que la función va a retornar una promesa.

// await: Se usa dentro de una función async para esperar que una promesa se resuelva antes de continuar con la ejecución del código.

const url = "https://jsonplaceholder.typicode.com/comments";

// fetch(url)
//     .then((response) => {
//         if(response.ok) {
//             return response.json()
//         }
//         throw new Error('Hubo un error...')
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// Función asincrónica para consultar la API
const consultarAPI = async () => {
  try {
    // Se usa await para esperar la respuesta de la fetch
    const response = await fetch(url);

    // Si la respuesta no es ok (status diferente de 200)
    if (!response.ok) {
      throw new Error("Hubo un error...");
    }

    // Se espera a que los datos sean convertidos a JSON
    const data = await response.json();
    console.log(data); // Muestra los datos en consola
  } catch (error) {
    // Maneja cualquier error que ocurra durante la operación
    console.log(error.message);
  }
};

// Llama a la función
consultarAPI();
