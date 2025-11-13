const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        title: String,
        price: Number,
        tipo: String,
        foto: String
    }],
    subtotal: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'procesando', 'completado', 'cancelado'],
        default: 'pendiente'
    },
    paymentMethod: {
        type: String,
        enum: ['transferencia', 'tarjeta', 'efectivo'],
        default: 'transferencia'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Índice para búsquedas por comprador
orderSchema.index({ buyer: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
