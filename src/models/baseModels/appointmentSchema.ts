import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Appointment interface
interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  appointmentType: string;
  createdAt: Date;
  createdBy: string;
  deletedBy?: string;
  isActive: boolean;
  isDeleted: boolean;
  notes?: string;
  status: string;
}

// Define the Appointment schema
const AppointmentSchema: Schema = new Schema<IAppointment>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: 'Doctor' },
    appointmentDate: { type: Date, required: true },
    appointmentType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    deletedBy: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    notes: { type: String },
    status: { type: String, required: true, enum: ['pending', 'sceduled', 'completed', 'canceled'], default: 'pending' },
  },
  {
    timestamps: true,
  }
);

// Create the Appointment model
const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;