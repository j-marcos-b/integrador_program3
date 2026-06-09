import { Router } from 'express';
import { check } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_electronico: { type: string, example: "admin@clinica.com" }
 *               contrasenia: { type: string, example: "admin123" }
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', [
    check('correo_electronico', 'El email es obligatorio y debe ser válido').isEmail(),
    check('contrasenia', 'La contraseña es obligatoria').notEmpty()
], authController.login);

export default router;