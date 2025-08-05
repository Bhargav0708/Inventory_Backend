import { customError } from "../helpers/customError";
import { Product } from "../models/product.model";
import { Stocks } from "../models/stock.model";
import { User } from "../models/user.model";

export const stockRepositry = {
  async create(data: Stocks) {
    return await Stocks.create(data);
  },
  async getAll() {
    return await Stocks.findAll();
  },
  async update(data: Stocks, id: number) {
    try {
      // const proudctid = id;
      const updatestockdata = await Stocks.update(data, {
        where: { productid: id },
      });
      return updatestockdata;
    } catch (err) {
      throw err;
    }
  },
  async delete(dataId: number) {
    //
    const foundproductstocks = Stocks.findOne({
      where: { productid: dataId },
    });
    if (foundproductstocks == null) {
      // throw new Error("the stock is not found for the pruduct ");
      throw new customError("STOCK_NOT_FOUND", "Stock Not Found to Delete");
    } else {
      const deletetheaddress = Stocks.destroy({ where: { productid: dataId } });
      return deletetheaddress;
    }
  },
  async getProductData(product_id: number) {
    try {
      return await Stocks.findOne({
        where: {
          productid: product_id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async getSupplierid(id: number) {
    try {
      const supplier = await Product.findOne({
        where: {
          product_id: id,
          deletedAt: null,
        },
      });
      if (supplier) {
        return supplier;
      } else {
        throw new customError(
          "PRODUCT_SUPPLER_DELETED",
          "Supplier might be get deleted "
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      } else {
        throw error;
      }
    }
  },
  async getUserAllDataByid(id: number) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new customError("USER_DELETED", "User is deleted ");
      }
      return user;
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      } else {
        throw error;
      }
    }
  },
};
