import { JwtPayload } from "jsonwebtoken";
import { genrateToken, isValidEmail, verifyToken } from "../../utils/auth";
import { mailsend } from "../../utils/mailer";
import { OTP } from "../models/otp.model";
import { User } from "../models/user.model";
import { authRepository } from "../repositeries/auth.repositry";
import bcrypt from "bcrypt";
import { throwDeprecation } from "process";
import { customError } from "../helpers/customError";
import { userRole } from "../models/userRole.model";
import redis from "../../utils/redis";
interface verification {
  email: string;
  otp: string;
  token: string;
}
interface userUpdation {
  name: string;
  email: string;
  password: string;
  phone: number;
}
export interface UserData {
  name?: string;
  email: string;
  password?: string;
  phone?: number;
  role: Array<string>;
  customertype: string;
  id?: number;
}
export interface loginData {
  email: string;
  password: string;
  role: Array<string>;
  id: number;
}
export const authService = {
  async Permission(data: string, data2: Array<string>) {
    try {
      const permission = await authRepository.Permission(data, data2);
      return permission;
    } catch (error) {}
  },
  async create(data: UserData): Promise<string> {
    try {
      const password = data.password;
      const hasedpassword = await bcrypt.hash(String(password), 12);
      const email = data.email;

      // const phone = data.phone;
      // if (typeof phone == "string") {
      //   throw new customError(
      //     "PHONE_NUMBER",
      //     "Phone Must be Number Not a string or other type"
      //   );
      // }
      if (!isValidEmail(data.email)) {
        throw new customError(
          "INVALID_EMAIL",
          "Please provide a valid email address."
        );
      }
      //
      const emailExists = await authRepository.getUser(email);
      if (emailExists) {
        throw new customError(
          "USER_EXISTS",
          "User aleready Exists Please Register With Another Email"
        );
      }

      const roleCheck = data.role;
      if (roleCheck.includes("customer")) {
        if (!data.customertype) {
          throw new customError(
            "CUSTOMER_TYPE_REQUIRED",
            "you should be enter customer type beacuse your role is customer or in multiple role your one of role is customer"
          );
        }
      }
      const bodydata = {
        name: data.name,
        email: data.email,
        password: hasedpassword,
        phone: data.phone,
        role: data.role,
        customertype: data.customertype,
      };
      const OTP = String(
        Math.floor((999999 - 100000) * Math.random() + 100000)
      );

      const otpdata = {
        otp: OTP,
        email: data.email,
      };

      const datatootp = await authRepository.storeOtp(otpdata as OTP);

      const token = genrateToken(bodydata as UserData);
      mailsend(
        data.email,
        "Your Verification",
        OTP,
        "Mail is for OTP And Register Verification"
      );

      return token;
    } catch (error) {
      console.log("eroor is:", error);
      if (error instanceof customError) {
        throw error;
      }
      throw error;
    }
  },

  async verifyOTP(data: verification) {
    try {
      const otp2 = data.otp;
      const email = data.email;
      const token = data.token;
      const verify = await authRepository.verifyOTP(otp2, email);
      if (verify == "Otp_invalid") {
        throw new customError("OTP_INVALID", "The Otp Is Invalid ");
      } else if (verify == "expired") {
        // throw new Error("OTP is expired");
        const result = await this.regenerateOtp(email);
        if (result.dataValues) {
          throw new customError(
            "OTP_EXPIRED",
            "The Otp is Expired the new otp has been sent to the email"
          );
        }
      } else {
        const body = (await verifyToken(token)) as JwtPayload;
        const datatobesent = {
          name: body.name,
          email: body.email,
          password: body.password,
          phone: body.phone,
          role: body.role,
          customertype: body.customertype,
        };

        const datatotable = await authRepository.create(
          datatobesent as UserData
        );
        return datatotable;
      }
    } catch (error) {
      console.log("otp", error);
      if (error instanceof customError) {
        throw error;
      }
    }
  },
  async login(data: UserData) {
    const email: string = data.email;
    const password = data.password;
    const role: Array<string> = data.role;
    let Role_match = false;
    // const id: number = data.id;

    const userData = await authRepository.getUser(email as string);

    //role checking
    const Rolechecking = await authRepository.getrole(email);
    if (Array.isArray(role)) {
      // Role_match = role.includes(Rolechecking.includes());
      Role_match = role.some((r) => Rolechecking.includes(r));
    } else {
      Role_match = role == Rolechecking;
    }
    if (!Role_match) {
      throw new customError(
        "ROLE_MISMATCHING",
        "Your Entered role is  mismatching"
      );
    }
    // if (Rolechecking) {

    // if()?
    // }

    if (!userData) {
      // throw new Error("user Does Not Exist");
      throw new customError(
        "USER_NOT_FOUND",
        "User is Not found in please Register Your Self"
      );
    }
    try {
      const validation = await bcrypt.compare(
        password!,
        userData.dataValues.password
      );
      const Userdata = {
        id: userData?.dataValues.id,
        name: userData?.dataValues.name,
        email: userData?.dataValues.email,
        role: role,
      };
      const userid = userData.id;
      if (validation == true) {
        const loginbody = {
          email: email,
          role: role,
          id: userid,
        };

        const login_token = genrateToken(loginbody as UserData);
        // const redisToken = await redis.set(
        //   `session:${email}`,
        //   login_token,
        //   "EX",
        //   300
        // );

        return {
          login_token,
          userData,
        };
      } else {
        // return "user is not valid check email and password again";
        throw new customError(
          "INVALID_CREDIENTAILS",
          "Check Email And Password Again!..."
        );
      }
    } catch (e) {
      console.log(e);
      if (e instanceof customError) {
        throw e;
      }
    }
  },
  async regenerateOtp(email: string) {
    try {
      console.log("this is a email for regenrated", email);
      const user = await authRepository.getUserinRegenreate(email);
      if (!user) {
        console.log("error");
        throw new customError("USER_NOT_FOUND", "User does not exist.");
      }

      const newOtp = String(Math.floor(100000 + Math.random() * 900000));
      const otpPayload = {
        email,
        otp: String(newOtp),
      };

      const result = await authRepository.storeOtp(otpPayload as OTP);

      mailsend(
        email,
        "OTP Regeneration",
        newOtp,
        "This is your regenerated OTP"
      );
      return result;
    } catch (error) {
      console.log("we are on regernrate otp");
      if (error instanceof customError) {
        throw error;
      }
      throw new customError("SERVER_ERROR", "Error while regenerating OTP.");
    }
  },
  async update(data: User, id: number) {
    try {
      const UserExists = await authRepository.getUserByid(id);
      // const hasedpassword = await bcrypt.hash(data.password, 12);
      if (data.password) {
        // return hasedpassword;
        data.password = await bcrypt.hash(data.password, 12);
      }
      if (!UserExists) {
        throw new customError("USER_NOT_FOUND", "User does not exist.");
      } else {
        if ("role" in data || "id" in data) {
          throw new customError(
            "FIELD_CANT_CHANGE",
            "Please dont enter the role and id that is not changable"
          );
        }
        const updateedUser = await authRepository.update(data, id);
        return updateedUser;
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }
  },
  async delete(id: number) {
    const deleteduser = await authRepository.delete(id);
    return deleteduser;
  },
};
