import { useReducer, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {

  // Se usa useReducer para manejar el estado global de la aplicación en lugar de un custom hook
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Guarda el estado del carrito en localStorage cada vez que se actualiza
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
      {/* Componente Header: Muestra la cabecera y el carrito */}
      <Header
        cart={state.cart} // Pasa el estado del carrito
        dispatch={dispatch} // Pasa la función dispatch para gestionar acciones del carrito
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Renderiza cada guitarra de la colección usando los datos del estado */}
          {state.data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
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
