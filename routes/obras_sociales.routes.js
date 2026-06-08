import { Router } from 'express';
import * as obrasSocialesController from '../controllers/obras_sociales.controller.js';
import { validateCreateObraSocial } from '../validators/obras_sociales.validator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ObrasSociales
 *   description: API para la gestión de obras sociales
 */

/**
 * @swagger
 * /obras-sociales:
 *   get:
 *     summary: Obtiene todas las obras sociales (paginado)
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 */
router.get('/', obrasSocialesController.getObrasSociales);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   get:
 *     summary: Obtiene una obra social por su ID
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Obra social encontrada
 */
router.get('/:id', obrasSocialesController.getObraSocialById);

/**
 * @swagger
 * /obras-sociales:
 *   post:
 *     summary: Crea una nueva obra social
 *     tags: [ObrasSociales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string, example: "OSDE" }
 *               descripcion: { type: string, example: "Obra Social de Ejecutivos" }
 *               porcentaje_descuento: { type: number, example: 25.50 }
 *               es_particular: { type: integer, example: 0 }
 *     responses:
 *       201:
 *         description: Obra social creada
 */
router.post('/', validateCreateObraSocial, obrasSocialesController.createObraSocial);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   put:
 *     summary: Actualiza una obra social
 *     tags: [ObrasSociales]
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
 *               nombre: { type: string, example: "Swiss Medical" }
 *               descripcion: { type: string, example: "Medicina Privada" }
 *               porcentaje_descuento: { type: number, example: 15.00 }
 *               es_particular: { type: integer, example: 0 }
 *     responses:
 *       200:
 *         description: Obra social actualizada
 */
router.put('/:id', validateCreateObraSocial, obrasSocialesController.updateObraSocial);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   delete:
 *     summary: Elimina una obra social (Soft Delete)
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Obra social eliminada
 */
router.delete('/:id', obrasSocialesController.deleteObraSocial);

export default router;