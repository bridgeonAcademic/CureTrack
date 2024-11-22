import { Joi } from "express-joi-validations";

const doctorSignUpValidation = Joi.object({
  fullName: Joi.string().required(),
  IMAId: Joi.string().required(),
  specialization: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});



export { doctorSignUpValidation };
