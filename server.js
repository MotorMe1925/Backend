const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Cargar variables de entorno de forma robusta (siempre desde la carpeta Backend)
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/vehicles', require('./src/routes/vehicles'));
app.use('/api/orders', require('./src/routes/orders'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de MotorMe funcionando correctamente',
        version: '1.0.0'
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
