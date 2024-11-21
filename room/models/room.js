const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    type: { type: String, enum: ['single', 'double', 'suite'], required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }, 
    description: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
