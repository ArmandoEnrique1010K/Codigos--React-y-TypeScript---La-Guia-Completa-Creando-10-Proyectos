import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Los Password no son iguales')
    }
    return true
  }),
  body('email').isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post('/confirm-account',
  body('token').notEmpty().withMessage('El Token no puede ir vacio'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post('/login',
  body('email').isEmail().withMessage('E-mail no valido'),
  body('password').notEmpty().withMessage('El password no puede ir vacio'),
  handleInputErrors,
  AuthController.login
)

router.post('/request-code',
  body('email').isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)

router.post('/forgot-password',
  body('email').isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post('/validate-token',
  body('token').notEmpty().withMessage('El Token no puede ir vacio'),
  handleInputErrors,
  AuthController.validateToken
)

// Endpoint para mostrar los datos del usuario
router.get('/user',
  authenticate,
  AuthController.user
)


// En postman, luego de autenticarse al iniciar sesión, copia el token
// Añade un nuevo request (petición) de tipo GET, hacia localhost:4000/api/auth/user
// pega el token en "Bearer Token" y al realizar la petición devuelve los datos del usuario

export default router;