import { Document, ObjectId } from "mongoose";

export interface IDoctors extends Document {
  _id: ObjectId;
  email: String;
  phoneNumber: Number;
  consultationFee: Number | null;
  specialization: String[];
  createdAt: Date;
  IMAId: String;
  password: String;
  fullName: String;
  vendorId: ObjectId[] | null;
  docotorId: String | null;
  qualification: String[] | null;
  experience: {}[];
  availableTimings: String[] | null;
  profilePicture: String | null;
  notifications: ObjectId[] | null;
  deletedBy: String | null;
  isDelete: Boolean | null;
  createdBy: String | null;
  isActive: Boolean | null;
}
