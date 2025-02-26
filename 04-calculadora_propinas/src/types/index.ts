// Tipos de datos de los objetos

// Representa un ítem del menú con su identificador, nombre y precio
export type MenuItem = {
    id: number,
    name: string,
    price: number
}

// Extiende MenuItem para incluir la cantidad de unidades en un pedido
export type OrderItem = MenuItem & {
    quantity: number
}