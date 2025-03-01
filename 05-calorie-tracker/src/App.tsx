import { useReducer, useEffect, useMemo } from 'react'
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'

function App() {

    // Usa useReducer para gestionar el estado global de actividades.
    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Guarda las actividades en localStorage cada vez que cambian.
    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    // Determina si la opción de reiniciar está disponible (true si hay actividades).
    const canRestartApp = useMemo(() => state.activities.length, [state.activities])

    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Contador de Calorias
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        // Deshabilita el botón si no hay actividades registradas.
                        disabled={!canRestartApp}
                        // Reinicia la aplicación eliminando todas las actividades.
                        onClick={() => dispatch({ type: 'restart-app' })}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            {/* Sección para agregar/editar actividades */}
            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form
                        // Pasa el dispatch y el state como prop
                        dispatch={dispatch}
                        state={state}
                    />
                </div>
            </section>

            {/* Contador de calorías consumidas y quemadas */}
            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker
                        // Se pasa solo el state de activities
                        activities={state.activities}
                    />
                </div>
            </section>

            {/* Listado de actividades registradas */}
            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList
                    activities={state.activities}
                    dispatch={dispatch}
                />
            </section>
        </>
    )
}

export default App
