const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const auth = require('../middleware/auth');
router.get('/', ReservationController.getAllReservations); 
router.get('/:id', ReservationController.getReservationById); 
router.post('/', auth, ReservationController.createReservation); 
router.put('/:id/cancel', auth, ReservationController.cancelReservation); 
router.delete('/:id', auth, ReservationController.deleteReservation); 

module.exports = router;
