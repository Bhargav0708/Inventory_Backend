import { Warehouseaddresses } from "../models/warehouseaddress.model";
import { warehouseAddressesRepostiry } from "../repositeries/warehouseaddess.repositry";

export const warehouseAddessService = {
  async create(data: Warehouseaddresses) {
    try {
      const warehouse_id = data.warehouseid;
      const address = data.address;
      const city = data.city;
      const state = data.state;
      const country = data.country;
      const warehouseAddess_data: object = {
        warehouseid: warehouse_id,
        address: address,
        city: city,
        state: state,
        country: country,
      };
      const datatobesent = await warehouseAddressesRepostiry.create(
        warehouseAddess_data as Warehouseaddresses
      );
      return datatobesent;
    } catch (err) {}
  },
  async getAll() {
    const warehouseAddress = await warehouseAddressesRepostiry.getAll();
    return warehouseAddress;
  },

  async update(data: Warehouseaddresses, id: number) {
    const updateedwarehouseAddress = await warehouseAddressesRepostiry.update(
      data,
      id
    );
    return updateedwarehouseAddress;
  },
  async delete(id: number) {
    const deleteedwarehouseAddress = await warehouseAddressesRepostiry.delete(
      id
    );
    return deleteedwarehouseAddress;
  },
};
