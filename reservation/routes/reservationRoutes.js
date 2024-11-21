const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const auth = require('../middleware/auth');
// Routes pour les réservations
router.get('/', ReservationController.getAllReservations); // Récupérer toutes les réservations
router.get('/:id', ReservationController.getReservationById); // Récupérer une réservation par ID
router.post('/', auth, ReservationController.createReservation); // Créer une réservation
router.put('/:id/cancel', auth, ReservationController.cancelReservation); // Annuler une réservation
router.delete('/:id', auth, ReservationController.deleteReservation); // Supprimer une réservation

module.exports = router;
