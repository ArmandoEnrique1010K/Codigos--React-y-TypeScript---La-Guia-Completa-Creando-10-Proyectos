// Un objeto de tipo MenuItem tiene los siguientes tipos de datos en sus propiedades
export type MenuItem = {
    id: number,
    name: string,
    price: number
}

// El objeto de tipo OrderItem hereda las propiedades de MenuItem y se agrega la propiedad quantity
export type OrderItem = MenuItem & {
    quantity: number
}