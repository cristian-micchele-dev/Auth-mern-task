import {Router} from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validatorSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post("/register", validatorSchema(registerSchema), register)
router.post("/login", validatorSchema(loginSchema), login)
router.post("/logout", logout)

// Usar authRequired middleware para verify
router.get("/verify", authRequired, (req, res) => {
    // Si llegamos aquí, el token es válido
    res.json({
        id: req.user._id,
        message: 'Token is valid'
    });
});

router.get("/profile", authRequired, profile);

export default router;