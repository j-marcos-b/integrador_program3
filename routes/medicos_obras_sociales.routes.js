import { Router } from 'express';
import * as vinculacionController from '../controllers/medicos_obras_sociales.controller.js';
import { validateAssignObraSocial } from '../validators/medicos_obras_sociales.validator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: MedicosObrasSociales
 *   description: API para gestionar las obras sociales que atiende un médico
 */

/**
 * @swagger
 * /medicos-obras-sociales/medico/{idMedico}:
 *   get:
 *     summary: Obtiene las obras sociales asignadas a un médico
 *     tags: [MedicosObrasSociales]
 *     parameters:
 *       - in: path
 *         name: idMedico
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de obras sociales del médico
 */
router.get('/medico/:idMedico', vinculacionController.getObrasSocialesByMedico);

/**
 * @swagger
 * /medicos-obras-sociales:
 *   post:
 *     summary: Asigna una obra social a un médico
 *     tags: [MedicosObrasSociales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico: { type: integer, example: 1 }
 *               id_obra_social: { type: integer, example: 1 }
 *     responses:
 *       201:
 *         description: Obra social asignada
 */
router.post('/', validateAssignObraSocial, vinculacionController.assignObraSocial);

/**
 * @swagger
 * /medicos-obras-sociales/medico/{idMedico}/obra-social/{idObraSocial}:
 *   delete:
 *     summary: Remueve una obra social de un médico
 *     tags: [MedicosObrasSociales]
 *     parameters:
 *       - in: path
 *         name: idMedico
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: idObraSocial
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Obra social removida
 */
router.delete('/medico/:idMedico/obra-social/:idObraSocial', vinculacionController.removeObraSocial);

export default router;