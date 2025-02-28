import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

// Componente para los contadores de calorias
export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // Numero de caliorias consumidas (se suma todas las actividades que tenga la categoria 1)
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    // Numero de calorias quemadas (se suma todas las actividades que tenga la categoria 2)
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    // La ganancia de calorias se obtiene restando las calorias consumidas y las calorias quemadas
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

                {/* Por cada tipo de calorias, se pasa el numero de calorias y un texto */}
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>

        </>
    )
}
