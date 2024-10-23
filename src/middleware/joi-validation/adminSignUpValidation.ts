import { Joi } from "express-joi-validations";

const adminSignUpValidation = Joi.object({
  FullName: Joi.string().required().min(3),
  Email: Joi.string().required().email(),
  PhoneNumber: Joi.string().required(),
  Password: Joi.string().required().min(6),
});

export { adminSignUpValidation };
