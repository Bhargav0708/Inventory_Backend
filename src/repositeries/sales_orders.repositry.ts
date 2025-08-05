import { customError } from "../helpers/customError";
import { Product } from "../models/product.model";
import { Salesorders } from "../models/sales_order.model";
import { User } from "../models/user.model";

export const Sales_orderRepositry = {
  async create(data: Salesorders) {
    return await Salesorders.create(data);
  },
  async getAll() {
    return await Salesorders.findAll();
  },
  async update(data: Salesorders, purchase_order_id: number) {
    try {
      const updateeduser = await Salesorders.update(data, {
        where: { purchase_order_id: purchase_order_id },
      });
      return updateeduser;
    } catch (error) {
      throw error;
    }
  },
  async delete(id: number) {
    try {
      const found_deleted_purchase = await Salesorders.findOne({
        where: { purchase_order_id: id },
      });
      //   "purchase Order_is not found in the repositry",
      //   found_deleted_purchase
      // );
      if (!found_deleted_purchase) {
        throw new customError("USER_NOT_FOUND", "User Not Found to delete ");
      } else {
        const deletetheaddress = Salesorders.destroy({
          where: { purchase_order_id: id },
        });
        return deletetheaddress;
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }
  },
  async CustomerDetailsOfSalesOrder() {
    try {
      const AllCustomerData = await Salesorders.findAll({
        include: [
          {
            model: User,
            as: "salesUser",
            attributes: ["name", "email", "phone", "id"],
          },
          {
            model: Product,
            as: "salesproducts",
            attributes: [
              "name",
              "price",
              "categoryid",
              "supplierid",
              "barcode",
            ],
          },
        ],
      });
      return AllCustomerData;
    } catch (error) {
      throw error;
    }
  },
  // async SalesOrderBySupplierID(id: number) {
  //   const SalesOrdersBySupplierID = await Salesorders.findAll({
  //     where: {},
  //   });
  // },
};
