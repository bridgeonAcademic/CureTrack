import { Joi } from "express-joi-validations";

const vendorSignUpValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().required(),
  license: Joi.string().required(),
  vendorRole: Joi.string().valid('hospital', 'lab', 'pharmacy').required(),
  password: Joi.string().required().min(6),
});

export { vendorSignUpValidation };
