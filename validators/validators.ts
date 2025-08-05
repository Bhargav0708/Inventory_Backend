import Joi from "joi";

export const signupjoischema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),

  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 15 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  // phone: Joi.number()
  //   .integer()
  //   .min(1000000000)
  //   .max(9999999999)
  //   .required()
  //   .messages({
  //     "number.base": "Phone number must be a number",
  //     "number.min": "Phone number must be exactly 10 digits",
  //     "number.max": "Phone number must be exactly 10 digits",
  //     "any.required": "Phone number is required",
  //   }),
  phone: Joi.string()
    .required()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone is required",
      "string.base": "Phone number must be a string",
      "string.pattern.base": "Phone number have must 10 digits",
    }),

  //   role: Joi.array().required().messages({
  //     "string.empty": "Role is required",
  //     "any.required": "Role is required",
  //   }),
  role: Joi.alternatives()
    .try(
      Joi.string().trim().min(1),
      Joi.array().items(Joi.string().trim().min(1)).min(1)
    )
    .required()
    .messages({
      "alternatives.match":
        "Role must be a non-empty string or an array of non-empty strings",
      "any.required": "Role is required",
    }),

  customertype: Joi.string().when("role", {
    is: "customer",
    then: Joi.required().messages({
      "any.required": "Customer type is required when role is customer",
    }),
    otherwise: Joi.optional(),
  }),
});

export const OTPSchema = Joi.object({
  otp: Joi.number().integer().min(100000).max(999999).required(),
  email: Joi.string().required(),
  token: Joi.string().required(),
});
export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.alternatives()
    .try(
      Joi.string().trim().min(1),
      Joi.array().items(Joi.string().trim().min(1)).min(1)
    )
    .required()
    .messages({
      "alternatives.match":
        "Role must be a non-empty string or an array of non-empty strings",
      "any.required": "Role is required",
    }),
});
