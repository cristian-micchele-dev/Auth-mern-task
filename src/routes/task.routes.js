import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTask, getTaskId, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { validatorSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/tasks', authRequired, getTask); 
router.get('/tasks/:id', authRequired, getTaskId);
router.post('/tasks', authRequired, validatorSchema(createTaskSchema), createTask); 
router.put('/tasks/:id', authRequired, updateTask); 
router.delete('/tasks/:id', authRequired, deleteTask);



export default router;