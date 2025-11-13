const Vehicle = require('../models/Vehicle');

// @desc    Obtener todos los vehículos
// @route   GET /api/vehicles
// @access  Public
exports.getVehicles = async (req, res) => {
    try {
        const { tipo, minPrice, maxPrice, search } = req.query;
        
        // Construir query
        let query = { status: 'disponible' };
        
        if (tipo) {
            query.tipo = tipo;
        }
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        if (search) {
            query.$text = { $search: search };
        }

        const vehicles = await Vehicle.find(query)
            .populate('seller', 'name email phone')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: vehicles.length,
            vehicles
        });
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        res.status(500).json({ message: 'Error al obtener vehículos' });
    }
};

// @desc    Obtener vehículo por ID
// @route   GET /api/vehicles/:id
// @access  Public
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
            .populate('seller', 'name email phone');

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        // Incrementar vistas
        vehicle.views += 1;
        await vehicle.save();

        res.json({
            success: true,
            vehicle
        });
    } catch (error) {
        console.error('Error al obtener vehículo:', error);
        res.status(500).json({ message: 'Error al obtener vehículo' });
    }
};

// @desc    Crear nuevo vehículo
// @route   POST /api/vehicles
// @access  Private
exports.createVehicle = async (req, res) => {
    try {
        const {
            title,
            price,
            tipo,
            modelo,
            anio,
            kilometraje,
            transmision,
            combustible,
            descripcion
        } = req.body;

        // Obtener información del vendedor
        const sellerInfo = {
            seller: req.user.id,
            sellerName: req.user.name,
            sellerPhone: req.user.phone,
            sellerEmail: req.user.email
        };

        // Si hay archivos subidos
        let fotos = [];
        if (req.files && req.files.length > 0) {
            fotos = req.files.map(file => `/uploads/${file.filename}`);
        }

        const vehicle = await Vehicle.create({
            title,
            price,
            tipo,
            modelo,
            anio,
            kilometraje,
            transmision,
            combustible,
            descripcion,
            fotos,
            ...sellerInfo
        });

        res.status(201).json({
            success: true,
            vehicle
        });
    } catch (error) {
        console.error('Error al crear vehículo:', error);
        res.status(500).json({ message: 'Error al crear vehículo', error: error.message });
    }
};

// @desc    Actualizar vehículo
// @route   PUT /api/vehicles/:id
// @access  Private
exports.updateVehicle = async (req, res) => {
    try {
        let vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        // Verificar que el usuario sea el dueño
        if (vehicle.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para actualizar este vehículo' });
        }

        // Si hay nuevas fotos
        if (req.files && req.files.length > 0) {
            const newFotos = req.files.map(file => `/uploads/${file.filename}`);
            req.body.fotos = [...(vehicle.fotos || []), ...newFotos];
        }

        vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            vehicle
        });
    } catch (error) {
        console.error('Error al actualizar vehículo:', error);
        res.status(500).json({ message: 'Error al actualizar vehículo' });
    }
};

// @desc    Eliminar vehículo
// @route   DELETE /api/vehicles/:id
// @access  Private
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        // Verificar que el usuario sea el dueño
        if (vehicle.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para eliminar este vehículo' });
        }

        await vehicle.deleteOne();

        res.json({
            success: true,
            message: 'Vehículo eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        res.status(500).json({ message: 'Error al eliminar vehículo' });
    }
};

// @desc    Obtener vehículos del usuario
// @route   GET /api/vehicles/my
// @access  Private
exports.getMyVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ seller: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: vehicles.length,
            vehicles
        });
    } catch (error) {
        console.error('Error al obtener mis vehículos:', error);
        res.status(500).json({ message: 'Error al obtener tus vehículos' });
    }
};
