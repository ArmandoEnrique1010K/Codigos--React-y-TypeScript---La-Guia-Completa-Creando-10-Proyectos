// Importa los tipos Request y Response de express
import { Request, Response } from 'express'
// Importa el modelo Product
import Product from '../models/Product.model'
// import { check } from 'express-validator'

// Función asincrona para obtener todos los productos, recibe una petición (no se utiliza) y una respuesta, además se asignan los types Request y Response
export const getProducts = async (req: Request, res: Response) => {
    // Consulta a la base de datos para obtener todos los productos

    // El metodo findAll() de sequelize obtiene todos los registros de la tabla (es una función asincrona)
    const products = await Product.findAll({
        // Ordena los productos por el id de forma descendente
        order: [
            ['id', 'DESC']
        ]
    })

    // Responde con un objeto JSON que contiene la propiedad data con los productos

    // Por defecto, el status de la respuesta es 200 (OK)
    res.json({ data: products })
}

// Función asincrona para obtener un producto por su id, recibe una petición y una respuesta
export const getProductById = async (req: Request, res: Response) => {
    // Obtiene el id del producto de la URL con req.params
    const { id } = req.params

    // El metodo findByPk() de sequelize obtiene un registro por su id de la tabla products
    const product = await Product.findByPk(id)

    // Si el producto no existe, responde con un error 404 y un mensaje
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Responde con un objeto JSON que contiene el producto
    res.json({ data: product })
}

// Función para crear un producto, recibe una petición y una respuesta
export const createProduct = async (req: Request, res: Response) => {

    // Puedes realizar validaciones en este archivo, pero es recomendable hacerlo en un middleware

    // Utiliza validación con la función check, coloca el nombre del campo, puedes encadenar diferentes funciones (reglas de validación)

    // run(req) ejecuta las validaciones en el objeto req

    // validationResult(req) obtiene los errores de validación en el objeto req

    // Si hay errores, responde con un código de estado 400 y un objeto JSON que contiene los errores, recuerda que return finaliza la ejecución de la función
    /*
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)
    await check('price')
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage("Precio no válido")
        .run(req)

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })

        return
    }

    */

    // El metodo create() de sequelize crea un nuevo registro en la tabla products con los datos de req.body
    const product = await Product.create(req.body)

    // Responde con un objeto JSON que contiene el producto creado
    // El status 201 indica que se ha creado un nuevo recurso, a diferencia del 200 que indica que se ha obtenido un recurso
    res.status(201).json({ data: product })
}

// Función para actualizar un producto, recibe una petición y una respuesta
export const updateProduct = async (req: Request, res: Response) => {
    // Primero se obtiene el id del producto de la URL y se busca en la base de datos
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Si el producto no existe, responde con un error 404 y un mensaje
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Actualiza el producto con los datos de req.body y lo guarda en la base de datos
    await product.update(req.body)
    await product.save()

    // Responde con un objeto JSON que contiene el producto actualizado
    res.json({ data: product })
}

// Función para actualizar la disponibilidad de un producto, recibe una petición y una respuesta
export const updateAvailability = async (req: Request, res: Response) => {
    // Obtiene el id del producto de la URL y lo busca en la base de datos
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Si el producto no existe, responde con un error 404 y un mensaje
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Cambia la disponibilidad del producto y lo guarda en la base de datos
    product.availability = !product.dataValues.availability
    await product.save()

    // Responde con un objeto JSON que contiene el producto actualizado
    res.json({ data: product })
}

// Función para eliminar un producto, recibe una petición y una respuesta
export const deleteProduct = async (req: Request, res: Response) => {

    // Obtiene el id del producto de la URL y lo busca en la base de datos
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Si el producto no existe, responde con un error 404 y un mensaje
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Elimina el producto de la base de datos con el metodo destroy()
    await product.destroy()

    // Responde con un objeto JSON que contiene un mensaje
    res.json({ data: 'Producto Eliminado' })
}