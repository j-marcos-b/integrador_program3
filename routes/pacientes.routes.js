import { Router } from 'express';
import {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
} from '../controllers/pacientes.controller.js';
import { validarPaciente } from '../validators/pacientes.validator.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_obra_social
 *       properties:
 *         id_paciente:
 *           type: integer
 *           description: ID autogenerado del paciente
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario asociado al paciente
 *         id_obra_social:
 *           type: integer
 *           description: ID de la obra social del paciente
 *       example:
 *         id_usuario: 5
 *         id_obra_social: 2
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Retorna la lista de pacientes (con paginación)
 *     tags: [Pacientes]
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
 *         description: Cantidad de pacientes por página
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida exitosamente
 */
router.get('/', getPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por su ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:id', getPacienteById);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Crea un nuevo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post('/', validarPaciente, createPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Actualiza un paciente existente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del paciente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       200:
 *         description: Paciente actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Paciente no encontrado
 */
router.put('/:id', validarPaciente, updatePaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Elimina un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del paciente a eliminar
 *     responses:
 *       200:
 *         description: Paciente eliminado exitosamente
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/:id', deletePaciente);

export default router;