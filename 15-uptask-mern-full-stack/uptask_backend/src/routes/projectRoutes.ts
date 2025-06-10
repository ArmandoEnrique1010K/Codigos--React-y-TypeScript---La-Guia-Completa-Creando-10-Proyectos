import { Router } from "express";
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middlewares/project";
import { taskBelongsToProject, taskExists } from "../middlewares/task";
import { authenticate } from "../middlewares/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();

// Protege todos los endpoints de este modulo (tecnica de middleware)
router.use(authenticate)

// Recordar que aqui estan definidas todas las rutas relacionadas a proyectos


router.post('/',
  // llama al middleware de authenticate
  // authenticate,
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
)


// Tambien se debe llamar al middleware authenticate para proteger el endpoint
router.get('/',
  // authenticate,
  ProjectController.getAllProjects)
// Ahora se requiere el JWT del usuario que ha iniciado sesión para obtener los proyectos en el endpoint: localhost:4000/api/projects


// Se debe autorizar al usuario a que acceda a un proyecto por su ID
router.get('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById)


router.put('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.updateProject)

router.delete('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.deleteProject)



/** Routes for task */

router.param('projectId',
  projectExists
)

router.post('/:projectId/tasks',
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.createTask)


router.get('/:projectId/tasks',
  TaskController.getProjectTasks
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.getTaskById
)


router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('status')
    .notEmpty().withMessage('El estado es obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)

/** Routes for team */

// Petición de tipo post, para enviar el email del usuario con validación
router.post('/:projectId/team/find',
  body('email').isEmail().toLowerCase().withMessage('E-mail no válido'),
  handleInputErrors,
  // Llama al metodo del controlador
  TeamMemberController.findMemberByEmail
)

// En Postman, recuerda autenticarse para obtener el token, luego copias y lo pegas el token en "Bearer Token", pasa tambien el id de un proyecto, de lo contrario mostrara un error si el proyecto no se encuentra en la base de datos o si el usuario no esta autenticado. Coloca en el body un campo email con el correo de un usuario existente (no el mismo usuario autenticado). Ejemplo:
// POST - localhost:4000/api/projects/68478ad2762ce02cc975befa/team/find
// BODY:
// {
//   "email": "juan@correo.com"
// }
// AUTH: Bearer Token - (JWT generado)

export default router