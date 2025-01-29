// Performance y Multiple Async Await

// Cuando realizas varias solicitudes de manera secuencial usando await, el código espera a que cada solicitud se complete antes de continuar con la siguiente. Esto puede ralentizar la aplicación si hay múltiples solicitudes a diferentes recursos, como en el caso de tus tres URL de API.

const url = "https://jsonplaceholder.typicode.com/comments";
const url2 = "https://jsonplaceholder.typicode.com/todos";
const url3 = "https://jsonplaceholder.typicode.com/photos";

const consultarAPI = async () => {
  try {
    const inicio = performance.now();

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const response2 = await fetch(url2);
    const data2 = await response2.json();
    console.log(data2);

    const response3 = await fetch(url3);
    const data3 = await response3.json();
    console.log(data3);

    const fin = performance.now();
    console.log(`El resultado de la PRIMER función es: ${fin - inicio} ms`);
  } catch (error) {
    console.log(error.message);
  }
};

consultarAPI();

// Para mejorar el rendimiento, puedes ejecutar todas las solicitudes simultáneamente usando Promise.all. Esto permite que las tres solicitudes se realicen en paralelo, en lugar de esperar que una termine antes de iniciar la siguiente.

// Promise.all([...]): Permite ejecutar múltiples promesas en paralelo. En este caso, se están realizando tres solicitudes fetch de manera simultánea.

// await Promise.all([...]): Espera a que todas las promesas dentro de Promise.all se resuelvan antes de continuar. Esto es mucho más rápido que esperar que se resuelvan una por una.

// Desestructuración: Usamos la desestructuración para asignar las respuestas a response, response2, y response3, y luego de manera similar para los datos con data, data2, y data3.
const consultarAPI2 = async () => {
  try {
    const inicio = performance.now();

    // Realiza todas las solicitudes simultáneamente
    const [response, response2, response3] = await Promise.all([
      fetch(url),
      fetch(url2),
      fetch(url3),
    ]);

    // Espera a que todas las respuestas se conviertan a JSON
    const [data, data2, data3] = await Promise.all([
      response.json(),
      response2.json(),
      response3.json(),
    ]);

    // Imprime los datos obtenidos
    console.log(data);
    console.log(data2);
    console.log(data3);

    const fin = performance.now();
    console.log(`El resultado de la SEGUNDA función es: ${fin - inicio} ms`);
  } catch (error) {
    console.log(error.message);
  }
};

consultarAPI2();

// Cuando realizas las solicitudes de manera secuencial, el tiempo total es mayor porque cada solicitud tiene que esperar a la anterior. Sin embargo, con Promise.all, todas las solicitudes se inician al mismo tiempo, y el tiempo total será el que tome la solicitud más lenta.
