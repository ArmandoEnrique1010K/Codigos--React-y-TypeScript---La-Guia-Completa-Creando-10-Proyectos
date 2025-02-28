// Contiene las propiedades de una categoria
export type Category = {
    id: number,
    name: string
}

// Contiene las propiedades de una actividad
export type Activity = {
    id: string
    category: number
    name: string
    calories: number
}