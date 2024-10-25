import { Joi } from "express-joi-validations";

const adminSignUpValidation = Joi.object({
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  Email: Joi.string().required().email(),
  PhoneNumber: Joi.string().required(),
  Password: Joi.string().required().min(6),
});

export { adminSignUpValidation };
