import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get('/',
  getProducts
)

router.post('/',
  body('name')
    .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

  body('price')
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom(value => value > 0).withMessage("Precio no válido")
  ,

  handleInputErrors,
  createProduct
)

router.get('/:id',
  param('id').isInt().withMessage('ID no válido'), handleInputErrors,
  getProductById
)

router.put('/:id',
  param('id').isInt().withMessage('ID no válido'),

  body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom(value => value > 0).withMessage("Precio no válido"),
  body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,
  updateProduct
)

router.patch('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvailability
)

router.delete('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
)


export default router