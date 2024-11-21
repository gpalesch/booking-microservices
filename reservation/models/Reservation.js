const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
  {
    user: { 
      type: String,  
      required: true 
    },
    room: { 
      type: String, 
      required: true 
    },
    checkInDate: { 
      type: Date, 
      required: true 
    }, 
    checkOutDate: { 
      type: Date, 
      required: true 
    }, 
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'], 
      default: 'pending' 
    }, 
    totalPrice: { 
      type: Number, 
      required: true 
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);
