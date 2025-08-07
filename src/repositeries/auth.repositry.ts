// import { User } from "../models";
import { compare } from "bcrypt";
import { User } from "../models/user.model";
import { OTP } from "../models/otp.model";
import { Op, where } from "sequelize";
import { customError } from "../helpers/customError";
import { sequelize } from "../config/database";
import { Roles } from "../models/role.model";
import { userRole } from "../models/userRole.model";
import { Permission } from "../models/permission.model";
import { RolePermisson } from "../models/rolepermission.model";
import { UserData } from "../services/auth.services";
// import{}
// import { bcrypt } from "bcrypt";
interface otpstore {
  otp: number;
  email: string;
}
interface userdata2 {
  name?: string;
  email: string;
  password?: string;
  phone?: number;
  role?: Array<string>;
  customertype?: string;
}
export const authRepository = {
  // async Permission() {
  //   const t = await sequelize.transaction();
  //   try {
  //   } catch (error) {
  //   }
  // },
  async Permission(permissionname: string, rolename: Array<string>) {
    const permission = await Permission.findOne({
      where: {
        permission_name: permissionname,
      },
    });
    const roles = await Roles.findAll({
      where: {
        role_name: rolename,
      },
    });
    for (const role of roles) {
      const result = await RolePermisson.findOrCreate({
        where: {
          roleid: role.roleid,
          permissionid: permission?.permissionid,
        },
      });
    }
    return true;
    // return result;
  },
  // export const assignPermissionToRoles = async (
  //   permissionName: string,
  //   description: string,
  //   roleNames: string[]
  // ) => {
  //   const [permission] = await Permission.findOrCreate({
  //     where: { name: permissionName },
  //     defaults: { description }
  //   });

  //   const roles = await Role.findAll({
  //     where: { name: roleNames }
  //   });

  // for (const role of roles) {
  //   await RolePermission.findOrCreate({
  //     where: {
  //       roleId: role.id,
  //       permissionId: permission.id
  //     }
  //   });
  // }

  // };

  // async migrationofrole() {
  //   const t = await sequelize.transaction();
  //   try {
  //     const users = await User.findAll({ transaction: t });
  //     const userRoleResults: userRole[] = [];

  //     for (const user of users) {
  //       const role = user.role;
  //       const userId = user.id;

  //       const rolesid = await Roles.findOne({
  //         where: { role_name: role },
  //         transaction: t,
  //       });

  //       if (!rolesid) {
  //         throw new Error(`Role "${role}" not found for user ${userId}`);
  //       }

  //       const dataofuserroletable = {
  //         userid: userId,
  //         roleid: rolesid.roleid,
  //       };

  //       const userRoletable = await userRole.create(
  //         dataofuserroletable as userRole,
  //         { transaction: t }
  //       );

  //       userRoleResults.push(userRoletable);
  //     }

  //     await t.commit();
  //     return userRoleResults;
  //   } catch (error) {
  //     console.error("Migration failed:", error);
  //     await t.rollback();
  //     throw error;
  //   }
  // },

  async create(data: UserData) {
    const datatobesent = {
      name: data!.name,
      email: data.email,
      password: data!.password,
      phone: data!.phone,
      customertype: data!.customertype,
    };
    const user_create = await User.create(datatobesent as User);
    // cons;
    console.log("the user created", user_create);
    if (user_create) {
      const user_role = await Roles.findAll({
        where: {
          role_name: data.role,
        },
      });
      let count = 0;

      for (const role of user_role) {
        let resultobj = {
          userid: user_create.dataValues.id,
          roleid: role.dataValues.roleid,
        };
        let resultcount = await userRole.create(resultobj as userRole);
        console.log("the result count", resultcount);
        if (resultcount) {
          count++;
        }
      }
      return count;
    }
  },
  async storeOtp(data: OTP) {
    try {
      return await OTP.create(data);
    } catch (error) {
      throw error;
    }
  },
  async verifyOTP(userOtp: string, email: string) {
    try {
      const otp2 = String(userOtp);
      console.log("the otp and email is", typeof otp2, typeof email);
      let status: string;
      const currentTime = new Date();
      const twoMinutesAgo = new Date(currentTime.getTime() - 2 * 60 * 1000);
      let data = {
        email: email,
        otp: otp2,
      };
      console.log("EMail is: " + email + "type is: " + typeof email);
      let otpcorrection = await OTP.findOne({
        where: {
          email,
          otp: otp2,
        },
      });
      console.log("the otp correction is", otpcorrection);
      if (!otpcorrection) {
        // statuss: "Otp_invalid",
        status = "Otp_invalid";
        return status;
      }

      let verifyotpwithtime = await OTP.findOne({
        where: {
          email: email,
          otp: otp2,
          createdAt: {
            // [Op.gt]: time,
            [Op.gte]: twoMinutesAgo,
          },
        },
      });
      console.log("the verifiy otp with time", verifyotpwithtime);
      if (!verifyotpwithtime) {
        status = "expired";
        return status;
      } else {
        return verifyotpwithtime;
      }
    } catch (error) {
      console.log("Otp error", error);
      throw error;
    }
  },
  // async getUser(email: string) {
  //   let user = await User.findOne({
  //     where: {
  //       email,
  //     },
  //     include: {
  //       model: Roles,
  //       as: "Roles",
  //       through: {
  //         attributes: {},
  //       },
  //     },
  //   });
  //   return user;
  // },
  async getUser(email: string) {
    return User.findOne({
      where: { email },
      include: [
        {
          model: Roles,
          as: "Roles",
          through: { attributes: [] },
        },
      ],
    });
  },
  async getUserinRegenreate(email: string) {
    let user = await OTP.findOne({
      where: {
        email,
      },
    });
    return user;
  },
  async getUserByid(id: number) {
    let user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  },
  async update(data: User, id: number) {
    try {
      const userid = id;

      const UserUpdatedInfo = await User.update(data, {
        where: {
          id: userid,
        },
      });
      return UserUpdatedInfo;
    } catch (error) {
      throw error;
    }
  },
  async delete(id: number) {
    const found_user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!found_user) {
      throw new customError("USER_NOT_FOUND", "User Not Found to delete ");
    } else {
      const deleted_User = User.destroy({
        where: { id: id },
      });
      return deleted_User;
    }
  },
  // async getrole(email: string) {
  //   try {
  //     const userid = await User.findOne({
  //       where: {
  //         email: email,
  //       },
  //     });
  //     if (userid) {
  //       const id = userid.id;
  //       const userrole = await userRole.findOne({
  //         where: {
  //           userid: id,
  //         },
  //       });
  //       if (userrole) {
  //         const roleid = userrole.roleid;
  //         const role = await Roles.findOne({
  //           where: {
  //             roleid: roleid,
  //           },
  //         });
  //         if (role) {
  //           const role_name = role.role_name;
  //           return role_name;
  //         }
  //       }
  //     } else {
  //       throw new customError("YOUR_ROLE_NOT_FOUND", "Your role is not found");
  //     }
  //   } catch (error) {
  //     if (error instanceof customError) {
  //       throw error;
  //     }
  //   }
  // },
  async getrole(email: string): Promise<string[]> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new customError("USER_NOT_FOUND", "User not found");
      }

      const userRoles = await userRole.findAll({
        where: { userid: user.id },
      });

      if (!userRoles || userRoles.length === 0) {
        throw new customError(
          "ROLE_NOT_FOUND",
          "No roles assigned to the user"
        );
      }

      const roleIds = userRoles.map((ur) => ur.roleid);

      const roles = await Roles.findAll({
        where: { roleid: roleIds },
      });

      const roleNames = roles.map((r) => r.role_name);

      return roleNames;
    } catch (error) {
      console.error("Error fetching roles:", error);
      if (error instanceof customError) {
        throw error;
      } else {
        throw new customError(
          "INTERNAL_ERROR",
          "Something went wrong while fetching roles"
        );
      }
    }
  },
};
