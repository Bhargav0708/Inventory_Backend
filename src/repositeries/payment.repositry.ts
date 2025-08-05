import { customError } from "../helpers/customError";
import { Payments } from "../models/payment.model";

export const paymentRepositry = {
  async create(data: Payments) {
    return await Payments.create(data);
  },
  async getAll() {
    return await Payments.findAll();
  },
  async update(data: Payments, purchase_order_id: number) {
    try {
      // const productid = id;
      const updateeduser = await Payments.update(data, {
        where: { order_id: purchase_order_id },
      });
      return updateeduser;
    } catch (error) {}
  },
  async delete(id: number) {
    try {
      const found_deleted_purchase = await Payments.findOne({
        where: { order_id: id },
      });
      //   "purchase Order_is not found in the repositry",
      //   found_deleted_purchase
      // );
      if (!found_deleted_purchase) {
        throw new customError("USER_NOT_FOUND", "User Not Found to delete ");
      } else {
        const deletetheaddress = Payments.destroy({
          where: { order_id: id },
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
