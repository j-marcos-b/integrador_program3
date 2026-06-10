import { Router } from 'express';
import * as turnosController from '../controllers/turnos.controller.js';
import { validateCreateTurno } from '../validators/turnos.validator.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: API para la gestión de turnos y reservas
 */

/**
 * @swagger
 * /turnos/estadisticas:
 *   get:
 *     summary: Obtiene estadísticas de atenciones y recaudación (Solo Administrador)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas generadas por Stored Procedure
 *       403:
 *         description: Acceso denegado
 */
router.get('/estadisticas', verifyToken, checkRole([3]), turnosController.getEstadisticas);

/**
 * @swagger
 * /turnos/mis-turnos:
 *   get:
 *     summary: Obtiene los turnos propios del Paciente o Médico logueado
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos propios
 *       403:
 *         description: No autorizado
 */
router.get('/mis-turnos', verifyToken, checkRole([1, 2]), turnosController.getMisTurnos);

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtiene todos los turnos (paginado)
 *     security:
 *       - bearerAuth: []
 *     tags: [Turnos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de turnos
 */
router.get('/', verifyToken, checkRole([3]), turnosController.getTurnos);

/**
 * @swagger
 * /turnos/{id}:
 *   get:
 *     summary: Obtiene un turno por su ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Turno encontrado
 */
router.get('/:id', verifyToken, turnosController.getTurnoById);

/**
 * @swagger
 * /turnos:
 *   post:
 *     summary: Crea un nuevo turno
 *     security:
 *       - bearerAuth: []
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico: { type: integer, example: 1 }
 *               id_paciente: { type: integer, example: 1 }
 *               id_obra_social: { type: integer, example: 1 }
 *               fecha_hora: { type: string, format: date-time, example: "2026-04-01 17:00:00" }
 *               atentido: { type: integer, example: 0 }
 *     responses:
 *       201:
 *         description: Turno creado
 */
router.post('/', verifyToken, checkRole([2, 3]), validateCreateTurno, turnosController.createTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   put:
 *     summary: Actualiza un turno
 *     security:
 *       - bearerAuth: []
 *     tags: [Turnos]
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
 *               id_medico: { type: integer, example: 1 }
 *               id_paciente: { type: integer, example: 1 }
 *               id_obra_social: { type: integer, example: 1 }
 *               fecha_hora: { type: string, format: date-time, example: "2026-04-01 17:00:00" }
 *               atentido: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Turno actualizado
 */
router.put('/:id', verifyToken, checkRole([3]), validateCreateTurno, turnosController.updateTurno);

/**
 * @swagger
 * /turnos/{id}/atendido:
 *   patch:
 *     summary: Marca un turno como atendido (Solo Médico)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
 */
router.patch('/:id/atendido', verifyToken, checkRole([1]), turnosController.marcarAtendido);

/**
 * @swagger
 * /turnos/{id}:
 *   delete:
 *     summary: Elimina un turno (Soft Delete)
 *     security:
 *       - bearerAuth: []
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Turno eliminado
 */
router.delete('/:id', verifyToken, checkRole([3]), turnosController.deleteTurno);

export default router;