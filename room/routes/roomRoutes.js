const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/auth');
// GET: Récupérer toutes les chambres
router.get('/', RoomController.getAllRooms);

// GET: Récupérer une chambre par ID
router.get('/:id', auth, RoomController.getRoomById);

// POST: Ajouter une nouvelle chambre
router.post('/', auth, RoomController.createRoom);

// PUT: Mettre à jour une chambre par ID
router.put('/:id', auth, RoomController.updateRoom);

// DELETE: Supprimer une chambre par ID
router.delete('/:id', auth, RoomController.deleteRoom);

module.exports = router;
