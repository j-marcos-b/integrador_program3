import { Router } from 'express';
import * as especialidadesController from '../controllers/especialidades.controller.js';
import { validateCreateEspecialidad } from '../validators/especialidades.validator.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: API para la gestión de especialidades
 */

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Obtiene todas las especialidades (paginado)
 *     security:
 *       - bearerAuth: []
 *     tags: [Especialidades]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de especialidades
 */
router.get('/', verifyToken, especialidadesController.getEspecialidades);

/**
 * @swagger
 * /especialidades/{id}:
 *   get:
 *     summary: Obtiene una especialidad por su ID
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 */
router.get('/:id', verifyToken, especialidadesController.getEspecialidadById);

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Crea una nueva especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string, example: "CARDIOLOGÍA" }
 *     responses:
 *       201:
 *         description: Especialidad creada
 */
router.post('/', verifyToken, checkRole([3]), validateCreateEspecialidad, especialidadesController.createEspecialidad);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Actualiza una especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string, example: "NEUROLOGÍA" }
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 */
router.put('/:id', verifyToken, checkRole([3]), validateCreateEspecialidad, especialidadesController.updateEspecialidad);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Elimina una especialidad (Soft Delete)
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Especialidad eliminada
 */
router.delete('/:id', verifyToken, checkRole([3]), especialidadesController.deleteEspecialidad);

export default router;