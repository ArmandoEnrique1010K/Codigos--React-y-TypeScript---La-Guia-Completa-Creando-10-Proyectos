
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

// Instancia de Router, para definir las rutas
const router = Router()

// Codigo para definir la documentación de Swagger UI con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

// Codigo para definir el endpoint /api/products con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *      
 */
// Define la ruta para obtener todos los productos con el método get y la función getProducts

// Accede a la URL: http://localhost:4000/api/products/ para ver la lista de productos
router.get('/', getProducts)


// Codigo para definir el endpoint /api/products/{id} con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

// Accede a la URL: http://localhost:4000/api/products/1 para ver un producto por su id
router.get('/:id',
    // Valida que el id sea un número entero con isInt()
    param('id').isInt().withMessage('ID no válido'),
    // Función para manejar los errores de validación
    handleInputErrors,
    // Función para obtener un producto por su id
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */

// Define la ruta para crear un producto con el método post y la función createProduct, recibe los datos del producto

// Accede a la URL: http://localhost:4000/api/products/ para crear un producto (petición de tipo POST)
router.post('/',
    // Validación encadenada de los campos de entrada

    // Campo name no puede ir vacio
    body('name')
        // notEmpty() es un método de validación que verifica si el campo no está vacio
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    // Campo price debe ser un número, no puede ir vacio y debe ser mayor a 0
    body('price')
        // isNumeric() es un método de validación que verifica si el campo es un número
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        // custom() es un método de validación personalizada, recibe una función que retorna un booleano
        .custom(value => value > 0).withMessage('Precio no válido'),

    // Función para manejar los errores de validación
    handleInputErrors,

    // Función para crear un producto
    createProduct
)

// Codigo para definir el endpoint /api/products/{id} con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * /api/products/{id}:  
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */

// Define la ruta para actualizar un producto por su id con el método put y la función updateProduct, recibe el id del producto y los datos a actualizar

// Accede a la URL: http://localhost:4000/api/products/1 para actualizar un producto por su id (petición de tipo PUT)
router.put('/:id',
    // Valida que el id sea un número entero con isInt()
    param('id').isInt().withMessage('ID no válido'),
    // Valida los campos de entrada
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        // isBoolean() es un método de validación que verifica si el campo es un booleano
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,

    // Función para actualizar un producto
    updateProduct
)

// Codigo para definir el endpoint /api/products/{id} con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

// Define la ruta para actualizar la disponibilidad de un producto por su id con el método patch y la función updateAvailability, recibe el id del producto

// Accede a la URL: http://localhost:4000/api/products/1 para actualizar la disponibilidad de un producto por su id (petición de tipo PATCH)
router.patch('/:id',
    // Valida que el id sea un número entero con isInt()
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    // Función para actualizar la disponibilidad de un producto
    updateAvailability
)

// Codigo para definir el endpoint /api/products/{id} con el siguiente formato (ver ejemplo en la documentación de Swagger UI, el patrón de diseño es el mismo):
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

// Define la ruta para eliminar un producto por su id con el método delete y la función deleteProduct, recibe el id del producto

// Accede a la URL: http://localhost:4000/api/products/1 para eliminar un producto por su id (petición de tipo DELETE)
router.delete('/:id',
    // Valida que el id sea un número entero con isInt()
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    // Función para eliminar un producto
    deleteProduct
)

export default router