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
 *     PacienteInput:
 *       type: object
 *       required:
 *         - documento
 *         - apellido
 *         - nombres
 *         - email
 *         - contrasenia
 *         - id_obra_social
 *       properties:
 *         documento:
 *           type: string
 *           description: Documento del paciente.
 *         apellido:
 *           type: string
 *           description: Apellido del paciente.
 *         nombres:
 *           type: string
 *           description: Nombres del paciente.
 *         email:
 *           type: string
 *           description: Correo electrónico del paciente.
 *         contrasenia:
 *           type: string
 *           description: Contraseña del usuario.
 *         id_obra_social:
 *           type: integer
 *           description: ID de la obra social del paciente.
 *       example:
 *         documento: "12345678"
 *         apellido: "Gomez"
 *         nombres: "Juan"
 *         email: "juan@example.com"
 *         contrasenia: "123456"
 *         id_obra_social: 1
 *     Paciente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del paciente
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario asociado al paciente
 *         nombres:
 *           type: string
 *           description: Nombres del paciente
 *         apellido:
 *           type: string
 *           description: Apellido del paciente
 *         email:
 *           type: string
 *           description: Email del paciente
 *         obraSocial:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             descripcion:
 *               type: string
 *         foto:
 *           type: string
 *           description: Ruta de la foto de perfil
 *       example:
 *         id: 1
 *         usuarioId: 5
 *         nombres: "Jacinto"
 *         apellido: "Lopez"
 *         email: "lopjac@correo.com"
 *         obraSocial:
 *           id: 1
 *           descripcion: "Jerárquicos"
 *         foto: ""
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
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
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
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
 *             $ref: '#/components/schemas/PacienteInput'
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