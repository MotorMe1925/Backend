const express = require('express');
const router = express.Router();
const {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getMyVehicles
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Rutas públicas
router.get('/', getVehicles);
router.get('/:id', getVehicleById);

// Rutas protegidas
router.get('/my/vehicles', protect, getMyVehicles);
router.post('/', protect, upload.array('fotos', 5), createVehicle);
router.put('/:id', protect, upload.array('fotos', 5), updateVehicle);
router.delete('/:id', protect, deleteVehicle);

module.exports = router;
