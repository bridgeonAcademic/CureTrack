import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IDoctors extends Document {
  fullName: String;
  email: String;
  phoneNumber: String;
  password: String;
  gender: string;
  consultationFee: Number | null;
  specialization: String[];
  createdAt: Date;
  primarySpecialization: string;
  medicalRegistrationNumber: string;
  medicalUniversity: string;
  yearsOfExperience: number;
  hospitalName: string;
  hospitalAddress: string;
  consultationFees?: number;
  dateOfBirth: Date;
  document: string;
  consentTreatment: boolean;
  medicalRegistrationCertificate: string;
  consentDisclosure: boolean;
  privacyPolicy: boolean;
  IMAId: String;
  vendorId: ObjectId[] | null;
  docotorId: String | null;
  qualification: String[] | null;
  // experience: {}[];
  availableTimings: String[] | null;
  profilePicture: String | null;
  notifications: ObjectId[] | null;
  deletedBy: String | null;
  isDelete: Boolean | null;
  createdBy: String | null;
  isActive: Boolean | null;
}

const DoctorsSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    consultationFee: { type: Number },
    specialization: [{ type: String, required: true }],
    createdAt: { type: Date, required: true },
    IMAId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    vendorId: [{ type: Schema.Types.ObjectId }],
    docotorId: { type: String },
    qualification: [{ type: String, required: true }],
    // experience: [{}],
    primarySpecialization: { type: String, required: true },
    medicalRegistrationNumber: { type: String, required: true },
    medicalUniversity: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    hospitalName: { type: String, required: true },
    hospitalAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    document: { type: String, required: true },
    medicalRegistrationCertificate: { type: String, required: true },
    consentTreatment: { type: Boolean, required: true },
    consentDisclosure: { type: Boolean, required: true },
    privacyPolicy: { type: Boolean, required: true },
    availableTimings: [{ type: String }],
    profilePicture: { type: String },
    notifications: [{ type: Schema.Types.ObjectId }],
    deletedBy: { type: String },
    isDelete: { type: Boolean },
    createdBy: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Doctors = mongoose.model<IDoctors>("Doctors", DoctorsSchema);

export default Doctors;
