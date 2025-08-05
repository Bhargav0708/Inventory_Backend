import { Warehouse } from "../models/warehouse.model";
import { warehouseRespositry } from "../repositeries/warehouse.repositry";

export const warehouseService = {
  async create(data: Warehouse) {
    try {
      // console.log("the data is of waehouse ", data);
      const name = data.name;
      const manager_name = data.manager_name;
      const isactive = data.isactive;
      const warehouseData: object = {
        name: name,
        manager_name: manager_name,
        isactive: isactive,
      };
      const datatobesent = await warehouseRespositry.create(
        warehouseData as Warehouse
      );
      return datatobesent;
    } catch (err) {
      // console.log(err);
    }
  },
  async getAll() {
    const allwarehouses = await warehouseRespositry.getAll();
    return allwarehouses;
  },

  async update(data: Warehouse, id: number) {
    const updateedwarehouse = await warehouseRespositry.update(data, id);
    return updateedwarehouse;
  },
  async delete(id: number) {
    const deleteedwarehouse = await warehouseRespositry.delete(id);
    return deleteedwarehouse;
  },
};
