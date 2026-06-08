import { Router } from 'express';
import * as medicosController from '../controllers/medicos.controller.js';
import { validateCreateMedico } from '../validators/medicos.validator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: API para la gestión de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Obtiene todos los médicos (paginado)
 *     tags: [Medicos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de médicos obtenida con éxito
 */
router.get('/', medicosController.getMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por su ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado
 */
router.get('/:id', medicosController.getMedicoById);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Crea un nuevo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento: { type: string, example: "30123456" }
 *               apellido: { type: string, example: "House" }
 *               nombres: { type: string, example: "Gregory" }
 *               email: { type: string, example: "house@hospital.com" }
 *               contrasenia: { type: string, example: "123456" }
 *               foto_path: { type: string, example: "http://example.com/foto.jpg" }
 *               id_especialidad: { type: integer, example: 1 }
 *               matricula: { type: string, example: "MN-1234" }
 *               descripcion: { type: string, example: "Especialista en diagnóstico" }
 *               valor_consulta: { type: number, example: 5000.50 }
 *     responses:
 *       201:
 *         description: Médico creado con éxito
 */
router.post('/', validateCreateMedico, medicosController.createMedico);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Actualiza los datos de un médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Mismas propiedades que el POST (omitidas aquí por brevedad)
 *     responses:
 *       200:
 *         description: Médico actualizado
 */
router.put('/:id', validateCreateMedico, medicosController.updateMedico);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Elimina un médico (Soft Delete)
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico eliminado
 */
router.delete('/:id', medicosController.deleteMedico);

export default router;