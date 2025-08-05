import { customError } from "../helpers/customError";
import { Warehouse } from "../models/warehouse.model";

export const warehouseRespositry = {
  async create(data: Warehouse) {
    try {
      return await Warehouse.create(data);
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    try {
      return await Warehouse.findAll();
    } catch (error) {
      throw error;
    }
  },
  async update(data: Warehouse, id: number) {
    try {
      const updatedwarehouse = await Warehouse.update(data, {
        where: { warehouse_id: id },
      });
      return updatedwarehouse;
    } catch (err) {
      throw err;
    }
  },
  async delete(dataid: number) {
    const foundwarehouse = Warehouse.findOne({
      where: { warehouse_id: dataid },
    });
    if (foundwarehouse == null) {
      // throw new Error("the warehouse is not found");
      throw new customError(
        "WAREHOUSE_NOT_FOUND",
        "WareHouse Not Found to Delete"
      );
    } else {
      const deletewarehouse = Warehouse.destroy({
        where: { warehouse_id: dataid },
      });
      return deletewarehouse;
    }
  },
};
