import express from 'express';
import { createAppointment, updateAppointmentStatus, getUpcomingAppointments } from '../controllers/appointmentControllers/appointmentController';


const router = express.Router();

// Route to create an appointment
router.post('/appointments', createAppointment);

router.get('/appointments/upcoming', getUpcomingAppointments)

// Route to update the status of an appointment
router.patch('/appointments/:id/status', updateAppointmentStatus);

export default router;