import { Request, Response, NextFunction } from 'express';
import Appointment from '../../models/appointmentModel/appointmentSchema';

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, vendorId, doctorId, appointmentDate, appointmentType, createdBy, notes, status } = req.body;

    // Create a new appointment
    const appointment = new Appointment({
      userId,
      vendorId,
      doctorId,
      appointmentDate,
      appointmentType,
      createdBy,
      notes,
      status,
    });

    await appointment.save();

     res.status(201).json({ message: 'Appointment created successfully', data: appointment });
  } catch (error) {
     res.status(500).json({ message: 'Error creating appointment', error: error });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Appointment ID from the URL
    const { status } = req.body; // New status from the request body
    console.log(id ,status)
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'canceled'];
    if (!validStatuses.includes(status)) {
       res.status(400).json({ message: 'Invalid status' });
    }

    // Update the status of the appointment
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!appointment) {
       res.status(404).json({ message: 'Appointment not found' });
    }

     res.status(200).json({ message: 'Status updated successfully', data: appointment });
  } catch (error) {
     res.status(500).json({ message: 'Error updating status', error: error });
  }
};

export const getUpcomingAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get today's date in ISO format (midnight)
    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Start of today
     // Start of tomorrow

    // Fetch appointments that are not completed and are scheduled for today
    const appointments = await Appointment.find({
      status: { $ne: 'completed' }, // Not completed
      // appointmentDate: { $gte: today }, // Today's date
    });

    // Send response
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

