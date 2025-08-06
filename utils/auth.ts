import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../src/models/user.model";
import bcrypt from "bcrypt";
import { Response } from "express";
import { customError } from "../src/helpers/customError";
import { error } from "console";
import { UserData } from "../src/services/auth.services";
// import redis from "./redis";

export function genrateToken(data: UserData): string {
  // const hasedpassword = await bcrypt.hash(data.password, 10);
  try {
    if (data.role!.includes("customer")) {
      const token = jwt.sign(
        {
          name: data.name as string,
          email: data.email as string,
          password: data.password as string,
          phone: data.phone as number,
          role: data.role as string[],
          customertype: data.customertype as string,
          id: data.id as number,
        },
        "Bhargav@12345",
        {
          expiresIn: "2h",
        }
      );
      return token;
    } else {
      const token = jwt.sign(
        {
          name: data.name as string,
          email: data.email as string,
          password: data.password as string,
          phone: data.phone as number,
          role: data.role as string[],
          id: data.id as number,
        },
        "Bhargav@12345",
        {
          expiresIn: "2h",
        }
      );

      return token;
    }
  } catch (e) {
    throw e;
  }
}

export async function verifyToken(token: string) {
  try {
    if (!token) {
      throw new customError(
        "TOKEN_MISSING",
        "The token is missing please provide the token"
      );
    }

    const decoded = jwt.verify(token, "Bhargav@12345");
    return decoded;
  } catch (error) {
    console.log("the error is of verify token", error);
    if (error instanceof customError) {
      throw error;
    } else if (error instanceof TokenExpiredError) {
      return {
        success: false,
        errorKey: "TOKEN_EXPIRED",
        errorMessage: "Token has expired. Please log in again.",
      };
    }
  }
}
// export function isValidEmail(email: string): boolean {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   return emailRegex.test(email);
// }
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
  // const allowedDomains = [
  //   "gmail.com",
  //   "yahoo.com",
  //   "outlook.com",
  //   "hotmail.com",
  //   "protonmail.com",
  //   "icloud.com",
  //   "esparkbizmail.com",
  // ];

  // const domain = email.split("@")[1].toLowerCase();
  // return allowedDomains.includes(domain);
}
// export function isStrongPassword(value: string) {
//   if (value.length < 6) {
//     throw new customError();
//   }
// }
