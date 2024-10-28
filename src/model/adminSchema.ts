import { timeStamp } from "console";
import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IAdmins extends Document {
  _id: ObjectId;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  CreatedAt: Date;
  ProfileImage: string | null;
  Notifications: ObjectId[] | null;
  CreatedBy: string | null;
  IsDelete: boolean | null;
  IsActive: boolean | null;
  DeletedBy: string | null;
  isVerified: boolean;
}

const AdminsSchema: Schema = new Schema(
  {
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    Password: { type: String, required: true },
    CreatedAt: { type: Date, required: true, default: Date.now() },
    ProfileImage: { type: String },
    Notifications: [{ type: Schema.Types.ObjectId }],
    CreatedBy: { type: String },
    IsDelete: { type: Boolean },
    IsActive: { type: Boolean },
    DeletedBy: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Admins = mongoose.model<IAdmins>("Admins", AdminsSchema);

export default Admins;
