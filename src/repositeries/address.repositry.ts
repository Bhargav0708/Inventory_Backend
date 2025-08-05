import { customError } from "../helpers/customError";
import { Addresses } from "../models/address.model";
export const AddressRepositry = {
  async create(data: Addresses) {
    try {
      return await Addresses.create(data);
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    try {
      return await Addresses.findAll();
    } catch (error) {
      throw error;
    }
  },
  async update(data: Addresses, id: number) {
    try {
      const addressid = id;
      const update_address = await Addresses.update(data, {
        where: { userid: addressid },
      });

      return update_address;
    } catch (err) {
      throw err;
    }
  },
  async delete(dataid: number) {
    try {
      const found_useraddres = await Addresses.findOne({
        where: { userid: dataid },
      });
      if (!found_useraddres) {
        throw new customError("USER_NOT_FOUND", "User Not Found to delete ");
      } else {
        const deletetheaddress = Addresses.destroy({
          where: { userid: dataid },
        });
        return deletetheaddress;
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }
  },
};
