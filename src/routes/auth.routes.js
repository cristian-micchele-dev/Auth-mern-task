import {Router} from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validatorSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';


const router = Router();

router.post("/register", validatorSchema(registerSchema), register)
router.post("/login", validatorSchema(loginSchema), login)
router.post("/logout", logout)

router.get("/verify", verifyToken); //ruta protegida

router.get("/profile", authRequired, profile); //ruta protegida

export default router;