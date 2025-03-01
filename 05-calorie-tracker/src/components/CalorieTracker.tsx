import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

// Componente para mostrar el resumen de calorías.
export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // Total de calorías consumidas (categoría 1).
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    // Total de calorías quemadas (categoría 2).
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    // Balance neto de calorías (consumidas - quemadas).
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

                {/* Muestra los totales de calorías en cada categoría */}
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
