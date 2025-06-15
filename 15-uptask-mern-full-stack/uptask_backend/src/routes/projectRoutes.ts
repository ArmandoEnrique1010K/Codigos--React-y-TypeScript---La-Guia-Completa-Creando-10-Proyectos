import { Router } from "express";
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middlewares/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middlewares/task";
import { authenticate } from "../middlewares/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router();

// Protege todos los endpoints de este modulo (tecnica de middleware)
router.use(authenticate)

// Recordar que aqui estan definidas todas las rutas relacionadas a proyectos


router.post('/',
  // llama al middleware de authenticate
  // authenticate,
  // No olvidar el middleware

  // Corrección, quitar el middleware hasAuthorization
  // hasAuthorization,
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


// Opcionalmente puedes mover la validación del parametro projectId hacia arriba, en este caso, antes de acutalizar un proyecto
router.param('projectId',
  projectExists
)

// Las funciones relacionadas deberian estar cerca de las funciones que las estan llamando

// Cambia el parametro id por projectId
router.put('/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,

  // Coloca hasAuthorization para utilizar el middleware que verifica que el usuario se ha autenticado, solamente el manager puede actualizar o eliminar un proyecto
  hasAuthorization,
  ProjectController.updateProject)

router.delete('/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  hasAuthorization,
  ProjectController.deleteProject)



/** Routes for task */



router.post('/:projectId/tasks',
  hasAuthorization,
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
  hasAuthorization, // Llama al middleware para validar que el usuario autenticado sea el mismo que el manager del proyecto
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
  hasAuthorization,
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

// Recuerda que el middleware hasAuthorization retorna un mensaje de error si no se cumple la condicion
// Si vas a validar en un solo lado, debe ser en el servidor, pero se recomienda validar tanto en el backend como en el frontend

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
// AUTH: Bearer Token - (JWT generado al autenticarse)


// Endpoint para agregar un miembro del equipo por id
router.post('/:projectId/team',
  // Debe ser un id de mongoDB (Object Id)
  body('id').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  TeamMemberController.addMemberById
)

// Añade una nueva solicitud en postman (requiere el id del proyecto y el id del usuario)
// POST - localhost:4000/api/projects/68478ad2762ce02cc975befa/team
// BODY:
// {
//   "id": "6844739dbce5f539aabb5cb3"
// }
// AUTH: Bearer Token - (JWT generado al autenticarse)


// Endpoint para obtener los miembros que comforman un equipo de trabajo de un proyecto
router.get('/:projectId/team',
  TeamMemberController.getProjectTeam
)

// GET - localhost:4000/api/projects/68478ad2762ce02cc975befa/team
// AUTH: Bearer Token - (JWT generado al autenticarse)


// Endpoint para eliminar a un miembro del equipo por id
// Realiza una correción, el id del usuario a eliminar debe estar en la URL, no debe pasarse en el body si es de tipo delete
router.delete('/:projectId/team/:userId',
  param('userId').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  TeamMemberController.removeMemberById
)

// Requiere el id del proyecto y el id del miembro a eliminar
// DELETE - localhost:4000/api/projects/68478ad2762ce02cc975befa/team/6848dbc9088866a2c93e2ff5
// AUTH: Bearer Token - (JWT generado al autenticarse)

/** Routes for Notes */

// Añadir una nota
router.post('/:projectId/tasks/:taskId/notes',
  body('content').notEmpty().withMessage('El Contenido de la nota es obligatorio'),
  handleInputErrors,
  NoteController.createNote
)

// Requiere el id del proyecto y el id de la tarea
// POST - http://localhost:4000/api/projects/68478ad2762ce02cc975befa/tasks/684a38c450372ebd56c0cbbd/notes
// AUTH: Bearer Token - (JWT generado al autenticarse)


// Obtener las notas de las tarea
router.get('/:projectId/tasks/:taskId/notes',
  NoteController.getTaskNotes
)

// GET - http://localhost:4000/api/projects/68478ad2762ce02cc975befa/tasks/684a38c450372ebd56c0cbbd/notes


// Eliminar una nota
router.delete('/:projectId/tasks/:taskId/notes/:noteId',
  param('noteId').isMongoId().withMessage('ID No Válido'),
  handleInputErrors,
  NoteController.deleteNote
)

// DELETE - http://localhost:4000/api/projects/68478ad2762ce02cc975befa/tasks/684a38c450372ebd56c0cbbd/notes/684a4493c01997d6ae3afe8c


export default router