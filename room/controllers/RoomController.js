const Room = require('../models/room'); // Importer le modèle Room

// Récupérer toutes les chambres
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find(); // Récupère toutes les chambres
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des chambres', error });
    }
};

// Récupérer une chambre par ID
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id); // Récupère la chambre par ID
        if (!room) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la chambre', error });
    }
};

// Ajouter une nouvelle chambre
const createRoom = async (req, res) => {
    try {
        const { roomNumber, type, price, description } = req.body;

        // Vérifier si le numéro de chambre est déjà utilisé
        const existingRoom = await Room.findOne({ roomNumber });
        if (existingRoom) {
            return res.status(400).json({ message: 'Le numéro de chambre est déjà utilisé' });
        }

        const newRoom = new Room({
            roomNumber,
            type,
            price,
            description,
        });

        const savedRoom = await newRoom.save(); // Enregistrer la chambre
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la chambre', error });
    }
};

// Mettre à jour une chambre par ID
const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, price, description, isAvailable } = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { type, price, description, isAvailable },
            { new: true, runValidators: true } // Renvoie le document mis à jour
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la chambre', error });
    }
};

// Supprimer une chambre par ID
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        res.status(200).json({ message: 'Chambre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la chambre', error });
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
};
