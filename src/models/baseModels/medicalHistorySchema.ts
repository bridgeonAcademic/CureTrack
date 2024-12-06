// import mongoose, { Schema, Document } from 'mongoose';

// // Define the interfaces for nested objects
// interface IMedicalHistory extends Document {
//   userId: mongoose.Types.ObjectId;
//   mediHistory: {
//     allergies?: Array<string>;
//     conditions?: {
//       [key: string]: any;
//     };
//     createdBy?: string;
//     deletedBy?: string;
//   };
//   doctorVisits: Array<{
//     doctorId: mongoose.Types.ObjectId;
//     prescriptionDetails?: Array<{
//       issuedDate: Date;
//       pharmacyId?: mongoose.Types.ObjectId;
//       validUntil?: Date;
//     }>;
//   }>;
//   immunizations?: Array<{
//     Date: Date;
//     immunityType: string;
//     vendorId: string;
//   }>;
//   isActive: boolean;
//   isDelete: boolean;
//   labReports?: Array<object>;
//   medications?: Array<{
//     medicineType: string;
//     vendorId: string;
//   }>;
//   surgeries?: Array<{
//     surgeryDate: Date;
//     surgeryType: string;
//     vendorId: string;
//   }>;
//   updatedAt: Date;
// }

// // Define the schema
// const MedicalHistorySchema: Schema = new Schema({
//   userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//   mediHistory: {
//     allergies: [{ type: String }],
//     conditions: { type: Object },
//     createdBy: { type: String },
//     deletedBy: { type: String },
//   },
//   doctorVisits: [
//     {
//       doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
//       prescriptionDetails: [
//         {
//           issuedDate: { type: Date },
//           pharmacyId: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
//           validUntil: { type: Date },
//         },
//       ],
//     },
//   ],
//   immunizations: [
//     {
//       Date: { type: Date },
//       immunityType: { type: String, required: true },
//       vendorId: { type: String },
//     },
//   ],
//   isActive: { type: Boolean, default: true },
//   isDelete: { type: Boolean, default: false },
//   labReports: [{ type: Object }],
//   medications: [
//     {
//       medicineType: { type: String },
//       vendorId: { type: String },
//     },
//   ],
//   surgeries: [
//     {
//       surgeryDate: { type: Date },
//       surgeryType: { type: String },
//       vendorId: { type: String },
//     },
//   ],
//   updatedAt: { type: Date, default: Date.now },
// });

// // Create and export the model
// const MedicalHistory = mongoose.model<IMedicalHistory>('MedicalHistory', MedicalHistorySchema);

// export default MedicalHistory;
import mongoose, { Schema, Document } from "mongoose";

interface PrescriptionDetails {
  issuedDate: Date;
  pharmacyId: mongoose.Types.ObjectId;
  validUntil: Date;
}

interface DoctorVisit {
  doctorId: mongoose.Types.ObjectId;
  prescriptionDetails: PrescriptionDetails[];
}

interface Immunization {
  date: Date;
  immunityType: string;
  vendorId: string;
}

interface Surgery {
  surgeryDate: Date;
  surgeryType: string;
  vendorId: string;
}

interface LabReport {
  medicineType: string;
  vendorId: string;
}

export interface IMedicalHistory extends Document {
  userId: mongoose.Types.ObjectId;
  mediHistory: {
    allergies: string[];
    conditions: Record<string, any>;
  };
  createdBy: string;
  deletedBy?: string;
  doctorVisits: DoctorVisit[];
  immunizations: Immunization[];
  isActive: boolean;
  isDelete: boolean;
  labReports: LabReport[];
  medications: string[];
  surgeries: Surgery[];
  updatedAt: Date;
}
// add vendor details to show to hospital details in the medical hisotyr page
const MedicalHistorySchema = new Schema<IMedicalHistory>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    mediHistory: {
      allergies: { type: [String], required: true },
      conditions: { type: Object, required: true },
    },
    createdBy: { type: String, required: true },
    deletedBy: { type: String },
    doctorVisits: [
      {
        doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
        prescriptionDetails: [
          {
            issuedDate: { type: Date, required: true },
            pharmacyId: { type: Schema.Types.ObjectId, required: true },
            validUntil: { type: Date, required: true },
          },
        ],
      },
    ],
    immunizations: [
      {
        date: { type: Date, required: true },
        immunityType: { type: String, required: true },
        vendorId: { type: String, required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    labReports: [
      {
        medicineType: { type: String, required: true },
        vendorId: { type: String, required: true },
      },
    ],
    medications: { type: [String], required: true },
    surgeries: [
      {
        surgeryDate: { type: Date, required: true },
        surgeryType: { type: String, required: true },
        vendorId: { type: String, required: true },
      },
    ],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const MedicalHistory = mongoose.model<IMedicalHistory>(
  "MedicalHistory",
  MedicalHistorySchema
);

export default MedicalHistory;