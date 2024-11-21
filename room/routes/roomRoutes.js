const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/auth');

router.get('/', RoomController.getAllRooms);

router.get('/:id', auth, RoomController.getRoomById);

router.post('/', auth, RoomController.createRoom);

router.put('/:id', auth, RoomController.updateRoom);

router.delete('/:id', auth, RoomController.deleteRoom);

module.exports = router;
