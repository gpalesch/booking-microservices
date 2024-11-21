const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
  {
    user: { 
      type: String, // Stocke l'ID utilisateur sous forme de chaîne
      required: true 
    },
    room: { 
      type: String, // Stocke l'ID de la chambre sous forme de chaîne
      required: true 
    },
    checkInDate: { 
      type: Date, 
      required: true 
    }, // Date d'arrivée
    checkOutDate: { 
      type: Date, 
      required: true 
    }, // Date de départ
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'], 
      default: 'pending' 
    }, // Statut de réservation
    totalPrice: { 
      type: Number, 
      required: true 
    }, // Prix total calculé pour la réservation
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);
