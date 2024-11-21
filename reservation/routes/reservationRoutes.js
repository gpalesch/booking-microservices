const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   room:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/', ReservationController.getAllReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 room:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Reservation not found
 */
router.get('/:id', ReservationController.getReservationById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roomId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', auth, ReservationController.createReservation);

/**
 * @swagger
 * /reservations/{id}/cancel:
 *   put:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation canceled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.put('/:id/cancel', auth, ReservationController.cancelReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.delete('/:id', auth, ReservationController.deleteReservation);

module.exports = router;
