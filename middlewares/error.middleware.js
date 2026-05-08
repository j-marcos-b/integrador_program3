export const errorHandler = (err, req, res, next) => {
    console.error('Error capturado por el middleware:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
};