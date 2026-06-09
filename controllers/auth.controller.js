import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as authData from '../data/auth.data.js';

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { correo_electronico, contrasenia } = req.body;

    try {
        // Encriptar la contraseña recibida en SHA-256 para poder compararla
        const hashedContrasenia = crypto.createHash('sha256').update(contrasenia).digest('hex');

        const user = await authData.getUserByEmail(correo_electronico);
        
        if (!user || user.contrasenia !== hashedContrasenia) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = { id_usuario: user.id_usuario, id_rol: user.rol };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};