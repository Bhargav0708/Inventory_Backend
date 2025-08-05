import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  OTPSchema,
  signupjoischema,
} from "../../validators/validators";
import { customError } from "../helpers/customError";

export const signupvalidation = {
  async signupschema(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = signupjoischema.validate(req.body);
      if (error) {
        // throw new customError(
        //   "VALIDATION_ERROR",
        //   `${error.details[0].message}`
        // );
        res.status(400).json({
          data: null,
          // msg: error.details[0].message,
          message: error.details[0].message,
        });
      } else {
        next();
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }
  },
  async OTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = OTPSchema.validate(req.body);
      if (error) {
        // throw new customError(
        //   "VALIDATION_ERROR",
        //   `${error.details[0].message}`
        // );
        res.status(401).json({
          data: null,
          msg: error.details[0].message,
        });
      } else {
        next();
      }
    } catch (error) {}
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        // throw new customError(
        //   "VALIDATION_ERROR",
        //   `${error.details[0].message}`
        // );
        res.status(401).json({
          data: null,
          msg: error.details[0].message,
        });
      } else {
        next();
      }
    } catch (error) {}
  },
};
