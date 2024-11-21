import Joi from "joi";

export const doctorProfileValidate = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{1,4}?[0-9]{7,14}$/i)
    .required(),
  IMAId: Joi.string().required(),
  email: Joi.string().email().required(),
  qualification: Joi.string(),
  primarySpecialization: Joi.string(),
  medicalRegistrationNumber: Joi.string(),
  medicalUniversity: Joi.string(),
  yearsOfExperience: Joi.number(),
  hospitalName: Joi.string(),
  hospitalAddress: Joi.string(),
  consultationFee: Joi.number(),
  gender: Joi.string(),
  dateOfBirth: Joi.date(),
  consentTreatment: Joi.boolean().valid(true).required(),
  consentDisclosure: Joi.boolean().valid(true).required(),
  privacyPolicy: Joi.boolean().valid(true).required(),
});
