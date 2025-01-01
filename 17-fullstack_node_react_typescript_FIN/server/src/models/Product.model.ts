// Importa los decoradores de sequelize-typescript
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

// @Table es un decorador que define el nombre de la tabla en la base de datos
@Table({
    tableName: 'products'
})

// Define la clase Product que extiende de Model (hereda de Model)
class Product extends Model {
    // Dentro de la clase Product, se definen las columnas de la tabla products

    // Usualmente el id es un número entero autoincrementable, te lo da una base de datos relacional como MySQL, PostgreSQL, etc.

    // @Column es un decorador que define una columna en la tabla
    @Column({
        // Define el tipo de dato de la columna 
        // STRING es un tipo de dato de texto con una longitud máxima de 100 caracteres, en este caso
        type: DataType.STRING(100)
    })

    // Asigna el nombre "name" a la columna, contiene datos de tipo string
    declare name: string

    @Column({
        // FLOAT es un tipo de dato numérico con decimales, en este caso 6 dígitos en total y 2 decimales
        // type: DataType.FLOAT(6, 2)
        type: DataType.FLOAT

        // Algunos motores de base de datos como DBeaver no soportan el tipo de dato FLOAT con decimales, en su lugar puedes usarlo sin limitar los decimales
    })
    declare price: number

    // @Default es un decorador que define un valor por defecto para la columna
    @Default(true)
    @Column({
        // BOOLEAN es un tipo de dato booleano
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product
