import { Router } from 'express';
import * as turnosController from '../controllers/turnos.controller.js';
import { validateCreateTurno } from '../validators/turnos.validator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: API para la gestión de turnos y reservas
 */

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtiene todos los turnos (paginado)
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
router.get('/', turnosController.getTurnos);

/**
 * @swagger
 * /turnos/{id}:
 *   get:
 *     summary: Obtiene un turno por su ID
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
router.get('/:id', turnosController.getTurnoById);

/**
 * @swagger
 * /turnos:
 *   post:
 *     summary: Crea un nuevo turno
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
 *               valor_total: { type: number, example: 4500.00 }
 *               atentido: { type: integer, example: 0 }
 *     responses:
 *       201:
 *         description: Turno creado
 */
router.post('/', validateCreateTurno, turnosController.createTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   put:
 *     summary: Actualiza un turno
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
 *               valor_total: { type: number, example: 4500.00 }
 *               atentido: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Turno actualizado
 */
router.put('/:id', validateCreateTurno, turnosController.updateTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   delete:
 *     summary: Elimina un turno (Soft Delete)
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
router.delete('/:id', turnosController.deleteTurno);

export default router;