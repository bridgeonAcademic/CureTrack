import { Joi } from "express-joi-validations";

const userSignUpValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  aadhaar: Joi.string().required().length(12),
  gender: Joi.string().required(),
  dob: Joi.string().required()
});

export { userSignUpValidation };