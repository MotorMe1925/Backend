const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getMySales,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    deleteOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/auth');

// Rutas protegidas - Las rutas específicas DEBEN ir ANTES de las paramétricas
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/my-sales', protect, getMySales); // Esta debe ir ANTES de /:id
router.put('/:id/status', protect, updateOrderStatus); // Específica debe ir ANTES de /:id
router.get('/:id', protect, getOrderById); // Ruta paramétrica al final
router.delete('/:id', protect, deleteOrder);

// Rutas de administrador
router.get('/', protect, admin, getAllOrders);

module.exports = router;
