import mongoose, { Schema } from "mongoose";
import { IDoctors } from "../../interfaces/doctorInterfaces";

const DoctorsSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  consultationFee: { type: Number },
  specialization: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now, required: true },
  IMAId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  vendorId: [{ type: Schema.Types.ObjectId }],
  docotorId: { type: String },
  qualification: [{ type: String }],
  experience: [{}],
  availableTimings: [{ type: String }],
  profilePicture: { type: String },
  notifications: [{ type: Schema.Types.ObjectId }],
  deletedBy: { type: String },
  isDelete: { type: Boolean },
  createdBy: { type: String },
  isActive: { type: Boolean },
});

const Doctors = mongoose.model<IDoctors>("Doctors", DoctorsSchema);

export default Doctors;
