import { useReducer } from "react"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import { initialState, orderReducer } from "./reducers/order-reducer"

function App() {

  // Se usa useReducer para manejar el estado global de la aplicación en lugar de un custom hook
  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      <main className=" max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className='p-5'>
          <h2 className='font-black text-4xl'>Menú</h2>

          <div className='mt-10 space-y-3'>
            {/* Itera con el arreglo de menuItems */}
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                dispatch={dispatch} // Pasa la función dispatch para gestionar acciones del carrito
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {/* Solamente si hay elementos en el state de order se muestra los contadores */}
          {state.order.length ? (
            <>
              <OrderContents
                order={state.order} // Pasa el estado de la orden
                dispatch={dispatch} // Pasa la función dispatch
              />
              <TipPercentageForm
                dispatch={dispatch}
                tip={state.tip} // Pasa el estado de la propina
              />
              <OrderTotals
                order={state.order}
                tip={state.tip}
                dispatch={dispatch}
              />
            </>
          ) : (
            <p className="text-center">La orden esta vacia</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App
