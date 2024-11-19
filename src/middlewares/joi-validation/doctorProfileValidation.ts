import Joi from "joi";

export const doctorProfileValidate = Joi.object({
  fullName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{1,4}?[0-9]{7,14}$/i)
    .required(),
  IMAId: Joi.string().required(),
  email: Joi.string().email().required(),
  qualification: Joi.string().required(),
  primarySpecialization: Joi.string().required(),
  medicalRegistrationNumber: Joi.string().required(),
  medicalUniversity: Joi.string().required(),
  yearsOfExperience: Joi.number().required(),
  hospitalName: Joi.string().required(),
  hospitalAddress: Joi.string().required(),
  consultationFees: Joi.number().optional(),
  dateOfBirth: Joi.date().required(),
  consentTreatment: Joi.boolean().valid(true).required(),
  consentDisclosure: Joi.boolean().valid(true).required(),
  privacyPolicy: Joi.boolean().valid(true).required(),
  gender:Joi.string().required()
});
