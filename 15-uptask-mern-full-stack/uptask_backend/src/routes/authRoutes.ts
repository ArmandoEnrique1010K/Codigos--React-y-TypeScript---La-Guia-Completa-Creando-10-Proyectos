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


/** Profile */
// Actualizar el perfil del usuario
router.put('/profile',
  // Requiere estar auntenticado
  authenticate,
  // Validacion del nombre y el email
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('email').isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.updateProfile)

// Añade una nueva carpeta en Postman llamada PROFILE para agrupar los endpoints relacionados a profile
// PUT - localhost:4000/api/auth/profile
// BODY
// {
//   "name": "Juan el Fullstack",
//     "email": "admin@correo.com"
// }
// AUTH: Bearer Token - (JWT generado al autenticarse)


// Para cambiar el password debes garantizar que la persona sepa su password anterior
router.post('/update-password',
  authenticate,
  // Valida los 3 passwords
  body('current_password').notEmpty().withMessage('El password actual no puede ir vacio'),
  body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
  // Recuerda que la validación de la nueva contraseña ingresada se hace aqui, el valor ingresado en el campo password debe ser igual al valor de este campo
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Los Password no son iguales')
    }
    return true
  }),
  handleInputErrors,
  AuthController.updateCurrentUserPassword,
)

// POST - localhost:4000/api/auth/update-password
// BODY
// {
//   "current_password": "password",
//     "password": "password2",
//       "password_confirmation": "password2"
// }
// AUTH: Bearer Token - (JWT generado al autenticarse)

export default router;