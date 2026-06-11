import PDFDocument from 'pdfkit';
import { validationResult } from 'express-validator';
import * as turnosService from '../services/turnos.service.js';
import * as turnosData from '../data/turnos.data.js';

export const getTurnos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const rows = await turnosService.getAllTurnos(page, limit);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener turnos' });
    }
};

export const getEstadisticas = async (req, res) => {
    try {
        const estadisticas = await turnosService.getEstadisticas();
        res.json(estadisticas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las estadísticas' });
    }
};

export const generarReportePDF = async (req, res) => {
    try {
        const turnos = await turnosService.getDatosReportePDF();

        // Configuramos la respuesta como un archivo descargable
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_turnos.pdf');

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        // Título principal
        doc.fontSize(20).text('Reporte General de Turnos', { align: 'center' });
        doc.moveDown(1);
        
        // Cumpliendo consigna: "cantidad"
        doc.fontSize(14).text(`Cantidad total de turnos activos: ${turnos.length}`);
        doc.moveDown(2);

        // Cumpliendo consigna: "pacientes, obras sociales, etc."
        turnos.forEach(turno => {
            const fecha = new Date(turno.fecha_hora).toLocaleDateString();
            doc.fontSize(12).font('Helvetica-Bold').text(`Turno #${turno.id_turno_reserva} - Fecha: ${fecha}`);
            doc.font('Helvetica').fontSize(10);
            doc.text(`Paciente: ${turno.paciente_nombres} ${turno.paciente_apellido}`);
            doc.text(`Obra Social: ${turno.obra_social}`);
            doc.text(`Médico: Dr/a. ${turno.medico_apellido}`);
            doc.text(`Valor Total: $${turno.valor_total}`);
            doc.moveDown(1);
        });

        doc.end();
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al generar el reporte en PDF' });
        }
    }
};

export const getTurnoById = async (req, res) => {
    const { id } = req.params;
    try {
        const turno = await turnosService.getTurnoById(id);
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        res.json(turno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el turno' });
    }
};

export const createTurno = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const insertId = await turnosService.createTurno(req.body);
        const nuevo = await turnosService.getTurnoById(insertId);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el turno' });
    }
};

export const updateTurno = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
        const actualizado = await turnosService.updateTurno(id, req.body);
        if (!actualizado) return res.status(404).json({ message: 'Turno no encontrado' });
        res.json({ message: 'Turno actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el turno' });
    }
};

export const deleteTurno = async (req, res) => {
    const { id } = req.params;
    const borrado = await turnosService.deleteTurno(id);
    borrado ? res.status(200).json({ message: 'Turno eliminado' }) : res.status(404).json({ message: 'Turno no encontrado' });
};

export const marcarAtendido = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await turnosService.marcarAtendido(id);
        if (!actualizado) return res.status(404).json({ message: 'Turno no encontrado' });
        res.json({ message: 'Turno marcado como atendido exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al marcar el turno como atendido' });
    }
};

export const getMisTurnos = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const rol = req.user.id_rol;

        let turnos = [];

        if (rol === 1) {
            turnos = await turnosData.getTurnosByMedicoUsuario(id_usuario);
        } else if (rol === 2) {
            turnos = await turnosData.getTurnosByPacienteUsuario(id_usuario);
        } else {
            return res.status(403).json({ message: 'Los administradores no tienen turnos propios.' });
        }

        res.status(200).json(turnos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los turnos propios' });
    }
};