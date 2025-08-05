import { create } from "domain";
import { Warehouseaddresses } from "../models/warehouseaddress.model";

export const warehouseAddressesRepostiry = {
  async create(data: Warehouseaddresses) {
    try {
      return await Warehouseaddresses.create(data);
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    try {
      return await Warehouseaddresses.findAll();
    } catch (error) {
      throw error;
    }
  },
  async update(data: Warehouseaddresses, id: number) {
    try {
      const updatedwarehouse = await Warehouseaddresses.update(data, {
        where: { warehouseid: id },
      });
      return updatedwarehouse;
    } catch (err) {
      throw err;
      // console.log(err);
    }
  },
  async delete(dataid: number) {
    const foundwarehouse = Warehouseaddresses.findOne({
      where: { warehouseid: dataid },
    });
    if (!foundwarehouse) {
      throw new Error("the warehouse is not found");
    } else {
      const deletewarehouse = Warehouseaddresses.destroy({
        where: { warehouseid: dataid },
      });
      return deletewarehouse;
    }
  },
};
