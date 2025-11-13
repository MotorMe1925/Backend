const mongoose = require('mongoose');
let mongoMemoryServer = null;

// Nota: En desarrollo, si no hay MongoDB local/Atlas disponible, haremos fallback a una BD en memoria
const connectDB = async () => {
    const useFallback = process.env.NODE_ENV !== 'production';
    const uri = process.env.MONGODB_URI;

    try {
        if (!uri) throw new Error('MONGODB_URI no está definida');

        const conn = await mongoose.connect(uri, {
            // opciones por defecto
        });
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        console.log(`📊 Base de datos: ${conn.connection.name}`);
        return;
    } catch (error) {
        console.warn(`⚠️  No se pudo conectar a MongoDB (${error.message})`);
        if (!useFallback) {
            console.error('❌ Abortando en producción. Configure MONGODB_URI.');
            process.exit(1);
        }
    }

    // Fallback: MongoDB en memoria para desarrollo/pruebas
    try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoMemoryServer = await MongoMemoryServer.create();
        const memUri = mongoMemoryServer.getUri();
        const conn = await mongoose.connect(memUri);
        console.log('✅ Conectado a MongoDB en memoria (desarrollo)');
        console.log(`📊 Base de datos: ${conn.connection.name}`);

        // Cierre ordenado en salida del proceso
        const shutdown = async () => {
            try {
                await mongoose.connection.close();
                if (mongoMemoryServer) await mongoMemoryServer.stop();
            } catch {}
            process.exit(0);
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
        process.on('exit', async () => {
            try {
                if (mongoMemoryServer) await mongoMemoryServer.stop();
            } catch {}
        });
    } catch (memErr) {
        console.error('❌ Error iniciando MongoDB en memoria:', memErr.message);
        process.exit(1);
    }
};

module.exports = connectDB;
