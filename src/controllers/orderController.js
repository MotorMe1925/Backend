const Order = require('../models/Order');
const Vehicle = require('../models/Vehicle');

// @desc    Crear nueva orden/compra
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { items, subtotal, iva, total, paymentMethod, notes } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Verificar que los vehículos existan y estén disponibles
        for (const item of items) {
            const vehicle = await Vehicle.findById(item.vehicle);
            if (!vehicle) {
                return res.status(404).json({ message: `Vehículo ${item.title} no encontrado` });
            }
            if (vehicle.status !== 'disponible') {
                return res.status(400).json({ message: `Vehículo ${item.title} ya no está disponible` });
            }
        }

        const order = await Order.create({
            buyer: req.user.id,
            items,
            subtotal,
            iva,
            total,
            paymentMethod,
            notes
        });

        // Opcional: Marcar vehículos como vendidos
        // for (const item of items) {
        //     await Vehicle.findByIdAndUpdate(item.vehicle, { status: 'vendido' });
        // }

        await order.populate('buyer', 'name email phone');
        await order.populate('items.vehicle');

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
    }
};

// @desc    Obtener órdenes del usuario
// @route   GET /api/orders/my
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('items.vehicle')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ message: 'Error al obtener tus compras' });
    }
};

// @desc    Obtener órdenes de mis vehículos publicados (ventas)
// @route   GET /api/orders/my-sales
// @access  Private
exports.getMySales = async (req, res) => {
    try {
        // Buscar todos los vehículos publicados por el usuario
        const Vehicle = require('../models/Vehicle');
        const myVehicles = await Vehicle.find({ seller: req.user.id });
        const myVehicleIds = myVehicles.map(v => v._id);

        // Buscar todas las órdenes que contengan mis vehículos
        const orders = await Order.find({ 'items.vehicle': { $in: myVehicleIds } })
            .populate('buyer', 'name email phone')
            .populate('items.vehicle')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error al obtener tus ventas' });
    }
};

// @desc    Obtener orden por ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('buyer', 'name email phone')
            .populate('items.vehicle');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verificar que el usuario sea el comprador o admin
        if (order.buyer._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para ver esta orden' });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ message: 'Error al obtener la orden' });
    }
};

// @desc    Actualizar estado de orden (Admin o Vendedor)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Seller
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id).populate('items.vehicle');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verificar si el usuario es admin o el vendedor de algún vehículo en la orden
        const isAdmin = req.user.role === 'admin';
        const isSeller = order.items.some(item => 
            item.vehicle && item.vehicle.seller && 
            item.vehicle.seller.toString() === req.user.id
        );

        if (!isAdmin && !isSeller) {
            return res.status(403).json({ message: 'No autorizado para actualizar esta orden' });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ message: 'Error al actualizar el estado de la orden' });
    }
};

// @desc    Obtener todas las órdenes (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('buyer', 'name email phone')
            .populate('items.vehicle')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
        res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
};

// @desc    Eliminar orden (Usuario puede eliminar sus propias órdenes)
// @route   DELETE /api/orders/:id
// @access  Private
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verificar que el usuario sea el comprador o admin
        if (order.buyer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para eliminar esta orden' });
        }

        await order.deleteOne();

        res.json({
            success: true,
            message: 'Orden eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar orden:', error);
        res.status(500).json({ message: 'Error al eliminar la orden' });
    }
};
