import { Request } from "express";

export interface DoctorBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  consultationFee: number | null;
  specialization: string[];
  primarySpecialization: string;
  medicalRegistrationNumber: string;
  medicalUniversity: string;
  yearsOfExperience: number;
  hospitalName: string;
  hospitalAddress: string;
  dateOfBirth: Date;
  document: string;
  consentTreatment: boolean;
  medicalRegistrationCertificate: string;
  consentDisclosure: boolean;
  privacyPolicy: boolean;
  IMAId: string;
  qualification: string[] | null;
  availableTimings: string[] | null;
  profilePicture: string | null;
}

export interface CustomRequest extends Request {
  files?: {
    profilePicture?: Express.Multer.File[];
    document?: Express.Multer.File[];
    medicalRegistrationCertificate?: Express.Multer.File[];
  };
}