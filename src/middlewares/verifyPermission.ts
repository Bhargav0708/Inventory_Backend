import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Roles } from "../models/role.model";
import { Permission } from "../models/permission.model";

export const verifyPermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {};
};
// import { Request, Response, NextFunction } from 'express';
// import { User, Role, Permission } from '../models'; // adjust paths as needed

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: No user found in request" });
      }

      const user = await User.findByPk(userId, {
        include: [
          {
            model: Roles,
            as: "Roles",
            include: [
              {
                model: Permission,
                as: "Permissions",
                where: { permission_name: requiredPermission },
                required: false, // allow roles without the permission
              },
            ],
          },
        ],
      });

      if (!user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
      }

      const hasPermission = user!.Roles.some((role: Roles) =>
        role.Permissions.some(
          (permission) => permission.permission_name === requiredPermission
        )
      );

      if (!hasPermission) {
        res.status(403).json({
          message: "Forbidden: You do not have the required permission",
        });
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
