import { machine } from "os";
import { Stocks } from "../models/stock.model";
import { stockRepositry } from "../repositeries/stock.repositry";
import { SendAlert } from "../../utils/mailer";
import { customError } from "../helpers/customError";

export const stockService = {
  async create(data: Stocks) {
    try {
      const productid = Number(data.productid);
      const warehouse_id = Number(data.warehouse_id);
      const quantity = Number(data.quantity);
      const minstock = Number(data.minstock);
      const maxstock = Number(data.maxstock);
      const recordstock = Number(data.recordstock);
      const stock_data: object = {
        productid: productid,
        warehouse_id: warehouse_id,
        quantity: quantity,
        minstock: minstock,
        maxstock: maxstock,
        recordstock: recordstock,
      };
      const datatobesent = await stockRepositry.create(stock_data as Stocks);
      return datatobesent;
    } catch (error) {}
  },
  async getAll() {
    const stocks = await stockRepositry.getAll();
    return stocks;
  },

  async update(data: Stocks, id: number) {
    // const is_available = await stockRepositry.getProductData(id);
    const updateedstock = await stockRepositry.update(data, id);
    return updateedstock;
  },
  async delete(id: number) {
    const deleteedstock = await stockRepositry.delete(id);
    return deleteedstock;
  },
  async Alert(id: number) {
    try {
      const product_id = id;
      const product_data = await stockRepositry.getProductData(product_id);

      const supplier_data = await stockRepositry.getSupplierid(product_id);
      const product_name = supplier_data?.name;

      const supplier_id = supplier_data?.supplierid;

      // const all_data = await
      const user_all_data = await stockRepositry.getUserAllDataByid(
        supplier_id!
      );
      const user_email = user_all_data?.email;
      // const user_role = user_all_data?.role;
      const subject = "!Important";
      if (product_data?.quantity! < product_data?.minstock!) {
        const message = `Alert Your Product ${product_name} has low stock fill it before out of stock genrated on ${Date.now()}`;
        SendAlert(user_email!, subject, message);
      } else if (product_data?.quantity! > product_data?.maxstock!) {
        const message = `Alert Your Product ${product_name} has over stock so don't try to fill it genrated on ${Date.now()}`;
        SendAlert(user_email!, subject, message);
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }
  },
};
