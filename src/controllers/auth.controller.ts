import { Request, Response } from "express";
import { authService } from "../services/auth.services";
import { verify } from "crypto";
import { customError } from "../helpers/customError";
// import { joi } from "joi";
export const authController = {
  async Permission(req: Request, res: Response) {
    try {
      const permission_name = req.body.permission_name;
      const role_name = req.body.role_name;
      const permission = await authService.Permission(
        permission_name,
        role_name
      );
      if (permission) {
        res.json({ msg: "Successful Permission" });
      } else {
        res.json({ msg: "Not done" });
      }
    } catch (error) {
      throw error;
    }
  },

  async create(req: Request, res: Response) {
    try {
      const usertoken = await authService.create(req.body);

      res.status(201).json({ token: usertoken });
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "INVALID_EMAIL") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "USER_EXISTS") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "CUSTOMER_TYPE_REQUIRED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "VALIDATION_ERROR") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "PHONE_NUMBER") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async verify(req: Request, res: Response) {
    try {
      const verifiedotp = await authService.verifyOTP(req.body);
      if (verifiedotp!) {
        res.status(200).json({
          data: null,
          msg: "Your Otp has been verifried",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey === "USER_NOT_FOUND") {
          res.status(404).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "OTP_INVALID") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "OTP_EXPIRED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "TOKEN_MISSING") {
          res.status(401).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async login(req: Request, res: Response) {
    try {
      const user = await authService.login(req.body);

      res.cookie("login_token", user);
      res.status(201).json({
        data: user,
        msg: "Login Successfully",
      });
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey === "USER_NOT_FOUND") {
          res.status(404).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "OTP_INVALID") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "OTP_EXPIRED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "ROLE_MISMATCHING") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "YOUR_ROLE_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "INVALID_CREDIENTAILS") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey === "TOKEN_EXPIRED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async regenreate(req: Request, res: Response) {
    try {
      const newOTP = await authService.regenerateOtp(req.body);
    } catch (error) {
      throw error;
    }
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }

      // if (req.file === undefined || req.file.path === undefined) {
      //   throw new customError(
      //     "FILE_REQUIRED",
      //     "Please Enter the Product Image "
      //   );
      // }

      // const path = req.file!.path;
      const updated_user_info = await authService.update(req.body, id);
      if (updated_user_info!.length > 0) {
        res.status(200).json({
          data: updated_user_info,
          msg: " User Info updated succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "User Info is Not Updated ",
        });
      }
    } catch (error) {
      error;
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "FIELD_CANT_CHANGE") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const deletedUser = await authService.delete(id);
      if (deletedUser! > 0) {
        res.status(200).json({
          data: deletedUser,
          msg: "The data is succesfully deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "User is not deleted",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "USER_NOT_FOUND") {
          res.status(404).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
};
// {
