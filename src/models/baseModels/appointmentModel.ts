import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientName: string;
  type: "completed" | "scheduled" | "cancelled";
  scheduledTime: Date;
  message?: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: true },
    type: {
      type: String,
      enum: ["completed", "scheduled", "cancelled"],
      required: true,
    },
    scheduledTime: { type: Date, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
