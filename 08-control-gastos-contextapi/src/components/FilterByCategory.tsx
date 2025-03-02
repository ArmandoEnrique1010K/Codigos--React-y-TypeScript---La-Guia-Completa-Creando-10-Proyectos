import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

// Componente para filtrar por categoría
export default function FilterByCategory() {

    // Llama al custom-hook para extraer dispatch
    const { dispatch } = useBudget()

    // Maneja el cambio en la selección de categoría
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        {/* Opción por defecto para mostrar todas las categorías */}
                        <option value="">-- Todas las Categorias</option>
                        {
                            // Renderiza las opciones dinámicamente desde la lista de categorías
                            categories.map(category => (
                                <option
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </form>

        </div>
    )
}
