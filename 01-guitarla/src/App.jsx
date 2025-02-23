import { useState, useEffect } from 'react'
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from './data/db'

// Componente principal de la aplicación
function App() {

  // Función para obtener los datos iniciales del carrito desde localStorage
  const initialCart = () => {
    // Obtiene los items almacenados en el key 'cart' de la API localStorage
    const localStorageCart = localStorage.getItem('cart')

    return localStorageCart ? JSON.parse(localStorageCart) : [] // Retorna el carrito almacenado o un array vacío
  }

  // Variables de estado
  const [data] = useState(db) // Estado para los datos del catálogo de guitarras
  const [cart, setCart] = useState(initialCart) // Estado para el carrito de compras

  // Límites para la cantidad de productos en el carrito
  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  // Efecto para sincronizar el carrito con localStorage en cada cambio
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Función para agregar un producto al carrito
  function addToCart(item) {

    // Busca el índice del producto en el carrito
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) { // Si el producto ya está en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return // No permite exceder el máximo permitido

      // Copia el carrito y aumenta la cantidad del producto seleccionado
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else { // Si el producto no está en el carrito
      item.quantity = 1 // Se establece la cantidad en 1
      setCart([...cart, item]) // Se agrega el producto al carrito
    }
  }

  // Función para eliminar un producto del carrito por su ID
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  // Función para disminuir la cantidad de un producto en el carrito
  function decreaseQuantity(id) {
    // Crea un nuevo carrito con la cantidad actualizada solo para el producto afectado
    const updatedCart = cart.map(item => {
      // Si el producto tiene el mismo ID y la cantidad es mayor que el mínimo permitido
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item, // Mantiene las demás propiedades del producto
          quantity: item.quantity - 1 // Disminuye la cantidad en 1
        }
      }
      return item; // Retorna los demás productos sin cambios
    })

    // Actualiza el estado del carrito con la nueva cantidad
    setCart(updatedCart)
  }

  // Función para aumentar la cantidad de un producto en el carrito
  // El procedimiento es parecido a decreaseQuantity
  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Función para vaciar el carrito por completo
  function clearCart() {
    setCart([])
  }

  // Renderiza la interfaz de usuario
  return (
    <>
      {/* Componente Header que recibe el carrito y funciones de manipulación */}
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Renderiza una guitarra por cada elemento en la lista de productos */}
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}

        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
