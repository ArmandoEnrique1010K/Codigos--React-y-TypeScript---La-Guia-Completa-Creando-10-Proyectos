// En este archivo se definen los tipos de datos para los objetos, se utilizan types y no interface

// El type Guitar contiene 5 propiedades, cada propiedad tiene un tipo de dato
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

// El type CartItem hereda el type Guitar y se agrega una propiedad quantity
export type CartItem = Guitar & {
    quantity: number
}

// Sintaxis de Utility Type, mantiene los mismos tipos de datos de la otra instancia

// Pick sirve para elegir ciertos elementos del otro type

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

// Omit sirve para omitir ciertos elementos del otro type

// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

