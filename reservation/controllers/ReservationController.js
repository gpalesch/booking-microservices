const Reservation = require('../models/Reservation');

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error });
    }
};

const createReservation = async (req, res) => {
    try {
        const { user, room, checkInDate, checkOutDate, totalPrice } = req.body;

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return res.status(400).json({ message: 'La date de départ doit être après la date d’arrivée' });
        }

        const existingReservation = await Reservation.findOne({
            room,
            status: 'confirmed',
            $or: [
                { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
                { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } },
            ],
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Cette chambre est déjà réservée pour les dates sélectionnées' });
        }

        const newReservation = new Reservation({
            user,
            room,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error });
    }
};

const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.status(200).json({ message: 'Réservation annulée avec succès', updatedReservation });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'annulation de la réservation', error });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    cancelReservation,
    deleteReservation,
};
