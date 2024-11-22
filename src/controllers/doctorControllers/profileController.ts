import { Request, Response } from "express";
import DoctorSchema from "../../models/doctorModels/doctorSchema";
import { doctorProfileValidate } from "../../middlewares/joi-validation/doctorProfileValidation";
import { MulterError } from "multer";
import { uploadFields } from "../../middlewares/doctorMiddlewares/multerConfig";

const saveDoctorProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return new Promise((resolve) => {
      uploadFields(req, res, async (err: MulterError | any) => {
        if (err) {
          return resolve(
            res.status(400).json({ success: false, message: err.message })
          );
        }

        try {
          const files = req.files as
            | {
                [fieldname: string]: Express.Multer.File[];
              }
            | undefined;

          const {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            qualification,
            primarySpecialization,
            medicalRegistrationNumber,
            medicalUniversity,
            IMAId,
            yearsOfExperience,
            hospitalName,
            hospitalAddress,
            consultationFee,
            consentTreatment,
            consentDisclosure,
            privacyPolicy,
            availableTimings,
          } = req.body;

          const validatedDoctor = await doctorProfileValidate.validateAsync({
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            qualification,
            primarySpecialization,
            medicalRegistrationNumber,
            medicalUniversity,
            IMAId,
            yearsOfExperience,
            hospitalName,
            hospitalAddress,
            consultationFee,
            consentTreatment,
            consentDisclosure,
            privacyPolicy,
          });

          const existingDoctor = await DoctorSchema.findOne({ IMAId });
          if (!existingDoctor) {
            return resolve(
              res
                .status(404)
                .json({ success: false, message: "Doctor not found" })
            );
          }

          existingDoctor.fullName =
            validatedDoctor.firstName + " " + validatedDoctor.lastName;
          existingDoctor.email = validatedDoctor.email;
          existingDoctor.phoneNumber = validatedDoctor.phoneNumber;
          existingDoctor.gender = validatedDoctor.gender;
          existingDoctor.dateOfBirth = validatedDoctor.dateOfBirth;
          existingDoctor.consultationFee = validatedDoctor.consultationFee;
          existingDoctor.primarySpecialization =
            validatedDoctor.primarySpecialization;
          existingDoctor.medicalRegistrationNumber =
            validatedDoctor.medicalRegistrationNumber;
          existingDoctor.medicalUniversity = validatedDoctor.medicalUniversity;
          existingDoctor.yearsOfExperience = validatedDoctor.yearsOfExperience;
          existingDoctor.hospitalName = validatedDoctor.hospitalName;
          existingDoctor.hospitalAddress = validatedDoctor.hospitalAddress;
          existingDoctor.consentTreatment = validatedDoctor.consentTreatment;
          existingDoctor.consentDisclosure = validatedDoctor.consentDisclosure;
          existingDoctor.privacyPolicy = validatedDoctor.privacyPolicy;
          existingDoctor.qualification = validatedDoctor.qualification;
          existingDoctor.availableTimings = availableTimings;

          existingDoctor.document =
            files?.document?.[0]?.path || existingDoctor.document;
          existingDoctor.medicalRegistrationCertificate =
            files?.medicalRegistrationCertificate?.[0]?.path ||
            existingDoctor.medicalRegistrationCertificate;
          existingDoctor.profilePicture =
            files?.profilePicture?.[0]?.path || existingDoctor.profilePicture;

          existingDoctor.isActive = true;
          existingDoctor.createdBy = req.body.createdBy || "System";

          await existingDoctor.save();

          resolve(
            res.status(200).json({
              success: true,
              message: "Doctor profile updated successfully",
              data: existingDoctor,
            })
          );
        } catch (innerError) {
          const err = innerError as Error;
          if ("isJoi" in err && (err as any).isJoi === true) {
            return resolve(
              res.status(400).json({
                success: false,
                message: `Validation error: ${err.message}`,
              })
            );
          } else {
            return resolve(
              res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
              })
            );
          }
        }
      });
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      success: false,
      message: `Unexpected server error: ${err.message}`,
    });
  }
};

export { saveDoctorProfile };
