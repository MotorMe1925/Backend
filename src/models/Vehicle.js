const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio debe ser mayor a 0']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de vehículo es obligatorio'],
        enum: ['Carro', 'Moto', 'Camioneta', 'Van'],
        default: 'Carro'
    },
    modelo: {
        type: String,
        trim: true
    },
    anio: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    kilometraje: {
        type: Number,
        min: 0
    },
    transmision: {
        type: String,
        enum: ['Manual', 'Automatica'],
        default: 'Manual'
    },
    combustible: {
        type: String,
        enum: ['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'],
        default: 'Gasolina'
    },
    descripcion: {
        type: String,
        trim: true
    },
    fotos: [{
        type: String // URLs de las imágenes
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerName: {
        type: String
    },
    sellerPhone: {
        type: String
    },
    sellerEmail: {
        type: String
    },
    status: {
        type: String,
        enum: ['disponible', 'vendido', 'pausado'],
        default: 'disponible'
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Índices para búsquedas más rápidas
vehicleSchema.index({ title: 'text', modelo: 'text', descripcion: 'text' });
vehicleSchema.index({ tipo: 1, price: 1 });
vehicleSchema.index({ seller: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
