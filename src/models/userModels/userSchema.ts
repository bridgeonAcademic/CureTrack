import mongoose, { Schema } from "mongoose";
import { IUsers } from "../../interfaces/userInterfaces";

const UsersSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    city: { type: String },
    country: { type: String },
    pinCode: { type: Number },
    state: { type: String },
    street: { type: String },
  },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  profilePicture: { type: String },
  govtDocment: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: String, required: true },
  medicalHistory: { type: Schema.Types.ObjectId, ref: "MedicalHistory" },
  appointments: { type: Schema.Types.ObjectId, ref: "Appointments" },
  reminders: [
    {
      createdAt: { type: Date, default: Date.now },
      frequency: { type: String },
      isActive: { type: Boolean },
      reminderText: { type: String },
      reminderTime: { type: String },
      reminderType: { type: String },
    },
  ],
  payments: { type: Schema.Types.ObjectId, ref: "Payments" },
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notifications" }],
  review: [
    {
      rating: { type: Number },
      reviewText: { type: String },
      vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    },
  ],
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  deletedBy: { type: String },
  occupation: { type: String },
  aadhaar: { type: String, required: true }
});

const Users = mongoose.model<IUsers>("Users", UsersSchema);

export default Users;
