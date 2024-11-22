import { Document, ObjectId } from "mongoose";

export interface IUsers extends Document {
  fullName: string;
  phoneNumber: number;
  email: string;
  password: string;
  address: {
    city: string | null;
    country: string | null;
    pinCode: number | null;
    state: string | null;
    street: string | null;
  };
  dateOfBirth: Date;
  gender: string;
  profilePicture: string | null;
  govtDocment: any | null;
  createdAt: Date;
  createdBy: string;
  medicalHistory: ObjectId | null;
  appointments: ObjectId | null;
  reminders: {
    createdAt: Date | null;
    frequency: string | null;
    isActive: boolean | null;
    reminderText: string | null;
    reminderTime: string | null;
    reminderType: string | null;
  }[];
  payments: ObjectId | null;
  notifications: ObjectId[] | null;
  review: {
    rating: number | null;
    reviewText: string | null;
    vendorId: ObjectId | null;
  }[];
  isDeleted: boolean | null;
  isActive: boolean | null;
  deletedBy: string | null;
  occupation: string | null;
}
