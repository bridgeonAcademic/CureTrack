import mongoose, { Schema, Document } from 'mongoose';

// Define the interfaces for nested objects
interface IMedicalHistory extends Document {
  userId: mongoose.Types.ObjectId;
  mediHistory: {
    allergies?: Array<string>;
    conditions?: {
      [key: string]: any;
    };
    createdBy?: string;
    deletedBy?: string;
  };
  doctorVisits: Array<{
    doctorId: mongoose.Types.ObjectId;
    prescriptionDetails?: Array<{
      issuedDate: Date;
      pharmacyId?: mongoose.Types.ObjectId;
      validUntil?: Date;
    }>;
  }>;
  immunizations?: Array<{
    Date: Date;
    immunityType: string;
    vendorId: string;
  }>;
  isActive: boolean;
  isDelete: boolean;
  labReports?: Array<object>;
  medications?: Array<{
    medicineType: string;
    vendorId: string;
  }>;
  surgeries?: Array<{
    surgeryDate: Date;
    surgeryType: string;
    vendorId: string;
  }>;
  updatedAt: Date;
}

// Define the schema
const MedicalHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  mediHistory: {
    allergies: [{ type: String }],
    conditions: { type: Object },
    createdBy: { type: String },
    deletedBy: { type: String },
  },
  doctorVisits: [
    {
      doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
      prescriptionDetails: [
        {
          issuedDate: { type: Date },
          pharmacyId: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
          validUntil: { type: Date },
        },
      ],
    },
  ],
  immunizations: [
    {
      Date: { type: Date },
      immunityType: { type: String, required: true },
      vendorId: { type: String },
    },
  ],
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
  labReports: [{ type: Object }],
  medications: [
    {
      medicineType: { type: String },
      vendorId: { type: String },
    },
  ],
  surgeries: [
    {
      surgeryDate: { type: Date },
      surgeryType: { type: String },
      vendorId: { type: String },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const MedicalHistory = mongoose.model<IMedicalHistory>('MedicalHistory', MedicalHistorySchema);

export default MedicalHistory;