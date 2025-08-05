import { Addresses } from "../models/address.model";
import { AddressRepositry } from "../repositeries/address.repositry";

export const AddresService = {
  async create(data: Addresses) {
    try {
      // console.log("the data is of address in service method ", data);
      const userid = data.userid;
      const address = data.address;
      const city = data.city;
      const state = data.state;
      const country = data.country;

      const AddressData: object = {
        userid: userid,
        address: address,
        city: city,
        state: state,
        country: country,
      };
      const datatobesent = await AddressRepositry.create(
        AddressData as Addresses
      );
      return datatobesent;
    } catch (err) {
      console.log(err);
    }
  },
  async getAll() {
    const Adderesses = await AddressRepositry.getAll();
    return Adderesses;
  },

  async update(data: Addresses, id: number): Promise<[number]> {
    const updateedaddress = await AddressRepositry.update(data, id);
    return updateedaddress!;
  },
  async delete(id: number) {
    const deleteedaddress = await AddressRepositry.delete(id);
    return deleteedaddress;
  },
};
