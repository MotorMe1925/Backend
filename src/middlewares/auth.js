const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Proteger rutas - verificar token JWT
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Obtener token del header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Verificar si existe el token
        if (!token) {
            return res.status(401).json({ message: 'No autorizado - Token no proporcionado' });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Obtener usuario del token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        next();
    } catch (error) {
        console.error('Error en auth middleware:', error);
        res.status(401).json({ message: 'No autorizado - Token inválido' });
    }
};

// Verificar rol de administrador
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado - Se requieren permisos de administrador' });
    }
};
