import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

// Middleware para manejar errores de validación de los campos de entrada
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Obtiene los errores de validación de la petición
    let errors = validationResult(req)
    // Si hay errores, responde con un código de estado 400 y un objeto JSON que contiene los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Si no hay errores, llama a la siguiente función en la cadena de middlewares con next()
    next()
}